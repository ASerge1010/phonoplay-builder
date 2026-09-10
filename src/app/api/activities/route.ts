import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        words: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(activities, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to retrieve activities." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      type,
      difficulty,
      description,
      instructions,
      gridSize,
      maxAttempts,
      showHints,
    } = body;

    if (!name || name.trim() === "") {
      return Response.json(
        { error: "Activity name is required." },
        { status: 400 }
      );
    }

    if (!["WORDLE", "WORD_SEARCH"].includes(type)) {
      return Response.json(
        { error: "Activity type must be WORDLE or WORD_SEARCH." },
        { status: 400 }
      );
    }

    if (
      difficulty &&
      !["EASY", "MEDIUM", "HARD"].includes(difficulty)
    ) {
      return Response.json(
        { error: "Difficulty must be EASY, MEDIUM or HARD." },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.create({
      data: {
        name: name.trim(),
        type,
        difficulty: difficulty || "EASY",
        description: description?.trim() || null,
        instructions: instructions?.trim() || null,
        gridSize: gridSize ?? null,
        maxAttempts: maxAttempts ?? null,
        showHints: showHints ?? true,
      },
      include: {
        words: true,
      },
    });

    return Response.json(activity, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to create activity." },
      { status: 500 }
    );
  }
}