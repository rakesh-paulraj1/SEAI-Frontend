import { Request, Response } from 'express';
const { GoogleGenAI, createUserContent, createPartFromUri } = require('@google/genai');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 

export class ResponseController {
  public async getairesponse(req: Request, res: Response): Promise<void> {
    try {
        if (!req.file) {
            res.status(400).json({
                error: "File not found"
            });
            return;
        }

        const ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINIAIKEY 
        });

        const config = {
            responseMimeType: 'application/json',
        };
        const model = "gemini-2.5-flash-preview-04-17";

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: "You are a health-related AI assistant. Analyze this medicine image and provide: 1. Medicine name, 2. Active ingredients, 3.Use cases,Format your response as JSON with these properties."
                    },
                    {
                        inlineData: {
                            data: req.file.buffer.toString('base64'), 
                            mimeType: req.file.mimetype
                        }
                    }
                ]
            }
        ];

       
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        let fullResponse = '';

        for await (const chunk of response) {
          fullResponse += chunk.text;
      }
   
      let parsedResponse = JSON.parse(fullResponse);
     
      if (!parsedResponse.medicine_name || !parsedResponse.active_ingredients) {
          throw new Error("AI response doesn't contain required fields");
      }

      console.log("Parsed AI response:", parsedResponse);
        res.json({
        message: "success",
          data:parsedResponse
        });

    } catch (error) {
        console.error("Error processing AI request:", error);
        res.status(500).json({
            message: "fail",
            error: "An error occurred while processing your request",
            details: error
        });
    }
}
public async gettest(req:Request,res:Response):Promise<void>{
    res.json({
        message: 'Successfully processed with Gemini API',})
}

}
