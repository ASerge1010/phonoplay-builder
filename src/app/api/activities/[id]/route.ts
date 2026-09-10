import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const activityId = Number(id);
    const body = await request.json();

    const existingActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existingActivity) {
      return Response.json(
        { error: "Activity not found." },
        { status: 404 }
      );
    }

    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        name: body.name,
        difficulty: body.difficulty,
        description: body.description,
        instructions: body.instructions,
        gridSize: body.gridSize,
        maxAttempts: body.maxAttempts,
        showHints: body.showHints,
      },
      include: {
        words: true,
      },
    });

    return Response.json(updatedActivity, { status: 200 });
  } catch (error) {
    console.error("Unable to update activity:", error);

    return Response.json(
      { error: "Unable to update activity." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const activityId = Number(id);

    const existingActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existingActivity) {
      return Response.json(
        { error: "Activity not found." },
        { status: 404 }
      );
    }

    await prisma.word.deleteMany({
      where: { activityId },
    });

    await prisma.activity.delete({
      where: { id: activityId },
    });

    return Response.json(
      { message: "Activity deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unable to delete activity:", error);

    return Response.json(
      { error: "Unable to delete activity." },
      { status: 500 }
    );
  }
}