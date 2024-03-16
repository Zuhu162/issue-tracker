import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body); //For validating the data against the schema

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  //Assigning task to user
  if (body.assignedToUserID) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserID },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  //Check if issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserID: body.assignedToUserID,
    },
  });

  return NextResponse.json(updatedIssue);
}

//Delete Issue API

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json(deletedIssue);
}
