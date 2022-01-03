import * as React from "react";
import { Button, Input, Heading, Grid } from "@chakra-ui/react";
import { Student } from "../types/types";

interface Props {
  students: Student[];
}

function StudentListItems({ students }: Props): JSX.Element {
  return (
    <>
      {students.map((student: Student) => (
        <Grid
          pt={2}
          templateColumns="1fr 1fr 1fr 1fr"
          columnGap="3"
          key={student.id}
        >
          <Input value={student.firstName} disabled />
          <Input value={student.lastName} disabled />
          <Input value={student.email} disabled />
          <Button>Delete</Button>
        </Grid>
      ))}
    </>
  );
}

function StudentList({ students }: Props) {
  return (
    <>
      <Heading>Student List</Heading>
      <StudentListItems students={students} />
    </>
  );
}

export default StudentList;
