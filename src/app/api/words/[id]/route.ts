import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const wordId = Number(id);

    if (Number.isNaN(wordId)) {
      return Response.json(
        { error: "Invalid word ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingWord = await prisma.word.findUnique({
      where: { id: wordId },
    });

    if (!existingWord) {
      return Response.json(
        { error: "Word not found." },
        { status: 404 }
      );
    }

    const updatedWord = await prisma.word.update({
      where: { id: wordId },
      data: {
        word: body.word?.trim(),
        phonemes: body.phonemes?.trim(),
        hint: body.hint?.trim(),
      },
    });

    return Response.json(updatedWord, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to update word." },
      { status: 500 }
    );
  }
}export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;
      const wordId = Number(id);
  
      if (Number.isNaN(wordId)) {
        return Response.json(
          { error: "Invalid word ID." },
          { status: 400 }
        );
      }
  
      const existingWord = await prisma.word.findUnique({
        where: { id: wordId },
      });
  
      if (!existingWord) {
        return Response.json(
          { error: "Word not found." },
          { status: 404 }
        );
      }
  
      await prisma.word.delete({
        where: { id: wordId },
      });
  
      return Response.json(
        { message: "Word deleted successfully." },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
  
      return Response.json(
        { error: "Unable to delete word." },
        { status: 500 }
      );
    }
  }