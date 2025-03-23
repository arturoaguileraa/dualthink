import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Helper function to convert a base64 string to a file for Gemini
function fileFromBase64(base64String, mimeType = "image/jpeg") {
  const buffer = Buffer.from(base64String, "base64");
  return { data: buffer, mimeType };
}

export async function POST(request) {
  try {
    const { userImage, productId, productName, productImage } =
      await request.json();

    if (!userImage || !productId || !productName || !productImage) {
      return NextResponse.json(
        {
          error:
            "Se requieren imágenes del usuario y del producto, así como la info del producto",
        },
        { status: 400 }
      );
    }

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Prepare the content parts
    const contents = [
      {
        text: `
        <context> 
        I have a photo of a person and a photo of a clothing item (${productName}). I want to try the ${productName} on the person in the first image.
        </context>
        <instructions>
        1. Keep everything about the person's face, body, pose and proportions intact, just add the clothing onto them, replace the correspondingclothing with the clothing item from the second image. 
        For example if the person is wearing a t-shirt, ONLY replace the t-shirt with the clothing item from the second image.
        2. Make sure you only add the clothing item ${productName} to the person in the first image.
        For example if the second image has a t-shirt, and jeans, but the product name is a t-shirt, make sure you only add the t-shirt to the person in the first image.
        </instructions>
        <constraints>
        The final result should look like a high-quality fashion photo showing how the product would look when worn by this specific person in the first image.
        </constraints>
        `,
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: userImage,
        },
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: productImage,
        },
      },
    ];

    // Set up the model with response modalities to include Image
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: {
        responseModalities: ["Text", "Image"],
      },
    });

    // Generate the content with both images
    const response = await model.generateContent(contents);

    // Initialize variables to store the response data
    let imageUrl = null;
    let responseText = null;

    // Process the response parts
    for (const part of response.response.candidates[0].content.parts) {
      if (part.text) {
        responseText = part.text;
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        // Return the base64 data as a data URL
        imageUrl = `data:${
          part.inlineData.mimeType || "image/png"
        };base64,${imageData}`;
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No se pudo generar la imagen" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl,
      responseText,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Error al generar la imagen", details: error.message },
      { status: 500 }
    );
  }
}
