import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Falta el prompt del usuario' },
                { status: 400 }
            );
        }

        // Inicializar la API de Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Obtener el modelo (puedes cambiar por otro si lo deseas)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Enviar el prompt al modelo
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        return NextResponse.json({ content: text });
    } catch (error) {
        console.error('Error al generar contenido con Gemini:', error);
        return NextResponse.json(
            { error: 'Error al generar contenido con Gemini' },
            { status: 500 }
        );
    }
}
