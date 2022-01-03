import * as React from "react";
import { Button, Input, Grid } from "@chakra-ui/react";

interface Props {
  setFirstName: (fname: string) => void;
  setLastName: (lname: string) => void;
  setEmail: (email: string) => void;
  addNewStudent: () => void;
}

function StudentAdd({
  setFirstName,
  setLastName,
  setEmail,
  addNewStudent,
}: Props) {
  return (
    <Grid pt={2} templateColumns="1fr 1fr 1fr 1fr" columnGap="3">
      <Input
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={() => addNewStudent()}>Add Student</Button>
    </Grid>
  );
}

export default StudentAdd;
