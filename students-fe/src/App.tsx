import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Keycloak from "keycloak-js";

import TopBar from "./components/TopBar";
import StudentList from "./components/StudentList";
import StudentAdd from "./components/StudentAdd";
import Unauthorized from "./components/Unauthorized";
import { ApiResponse, Student } from "./types/types";
import * as API from "./services/HttpService";

export function App() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  React.useEffect(() => {
    const keycloak = Keycloak({
      realm: "springboot-react",
      url: "http://localhost:8080/auth/",
      // "ssl-required": "external",
      // "resource": "student-ui-react",
      // "public-client": true,
      // "confidential-port": 0,
      clientId: "student-ui-react",
    });
    keycloak.init({ onLoad: "login-required" }).then((auth) => {
      localStorage.setItem("jwt", keycloak.token as string);
      getAllStudents();
    });
  }, []);

  const getAllStudents = async () => {
    await API.Get("/student", {})
      .then((response: ApiResponse) => {
        setStudents(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const addNewStudent = async () => {
    await API.Post("/student", {
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
      .then((response: ApiResponse) => {
        const payload: Student[] = [
          ...students,
          {
            id: students.length,
            firstName,
            lastName,
            email,
          },
        ];
        setStudents(payload);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const changeFname = (fname: string) => {
    setFirstName(fname);
  };

  const changeLname = (lname: string) => {
    setLastName(lname);
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <TopBar />
        {!localStorage.getItem("jwt") ? (
          <Unauthorized />
        ) : (
          <>
            <StudentList students={students} />
            <StudentAdd
              setFirstName={changeFname}
              setLastName={changeLname}
              setEmail={changeEmail}
              addNewStudent={addNewStudent}
            />
          </>
        )}
      </Box>
    </ChakraProvider>
  );
}
