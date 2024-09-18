import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function getUserScore(username: string): Promise<number | null> {
  const params = {
    TableName: "UserScores",
    Key: { username },
  };

  try {
    const data = await dynamoDb.get(params).promise();

    return data.Item ? data.Item.score : null;
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    throw new Error("Failed to get score");
  }
}

async function saveUserScore(username: string, score: number): Promise<void> {
  const params = {
    TableName: "UserScores",
    Item: {
      username,
      score,
    },
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (error) {
    console.error("Error saving score to DynamoDB:", error);
    throw new Error("Failed to save score");
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const score = await getUserScore(username);

    if (score !== null) {
      return new Response(score.toString(), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching user score" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, score } = body;

    if (!username || typeof score !== "number") {
      return NextResponse.json(
        { error: "Invalid input: username and score are required" },
        { status: 400 }
      );
    }

    await saveUserScore(username, score);

    return NextResponse.json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving to database:", error);

    return NextResponse.json(
      { error: "Failed to save score to the database" },
      { status: 500 }
    );
  }
}
