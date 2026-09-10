import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      include: {
        activity: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(words, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to retrieve words." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { word, phonemes, hint, activityId } = body;

    if (!word || word.trim() === "") {
      return Response.json(
        { error: "Word is required." },
        { status: 400 }
      );
    }

    if (!phonemes || phonemes.trim() === "") {
      return Response.json(
        { error: "Phoneme data is required." },
        { status: 400 }
      );
    }

    if (!activityId || typeof activityId !== "number") {
      return Response.json(
        { error: "A valid activity ID is required." },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.findUnique({
      where: {
        id: activityId,
      },
    });

    if (!activity) {
      return Response.json(
        { error: "Activity not found." },
        { status: 404 }
      );
    }

    const newWord = await prisma.word.create({
      data: {
        word: word.trim(),
        phonemes: phonemes.trim(),
        hint: hint?.trim() || null,
        activityId,
      },
    });

    return Response.json(newWord, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to create word." },
      { status: 500 }
    );
  }
}