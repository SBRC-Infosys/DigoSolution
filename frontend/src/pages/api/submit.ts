import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

type SheetForm = {
  name: string;
  email: string;
  number: string;
  subject: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST request are allowed" });
  }

  const body = req.body as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    const sheets = google.sheets({
        auth,
        version:'v4'
    });

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId:process.env.GOOGLE_SHEET_ID,
        range:"A1:E1",
        valueInputOption:"USER_ENTERED",
        requestBody:{
            values:[
                [body.name,body.email,body.number,body.message,body.subject]
            ]
        }
    });

    return res.status(200).json({
        data: response.data
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({message: "something is wrong"})
  }
}
