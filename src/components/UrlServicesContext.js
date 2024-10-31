import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UrlServicesContext = createContext();
const { Provider, Consumer } = UrlServicesContext;

function UrlServicesProvider({ children }) {
  /* ### API ### */
  //const [urlServices] = useState("http://localhost:3001/");
  //const [urlWeb] = useState("http://localhost:3000/");
  const [urlWeb] = useState("https://web.konexionhub.aplios.software/");
  const [urlServices] = useState(
    "https://web.konexionhub.aplios.software/konexionhub.api/"
  );

  /* ### LOAD API GOOGLE LOGIN */
  const [keyLoginGoogle] = useState(
    "513973892827-4gjpp1ns0np2pp0kt56rlcdo4p1urbea.apps.googleusercontent.com"
  );
  /* ### LOAD API GOOGLE MAP */
  const [keyMapGoogle] = useState("AIzaSyAXCamdFZHs_nBpiJHyS9y5e6IrLmtc4mk");

  const [UserAuth, setUserAuth] = useState(() => {
    const storedSession = localStorage.getItem("Session");
    return storedSession
      ? { Session: storedSession }
      : {
          id: "",
          Session: null,
          firstName: "",
          lastName: "",
          allname: "",
          documentId: "",
          email: "",
          phone: "",
          avatar: null,
          profile_id: "",
          profile_name: "",
          createdAt: "",
          status: "",
          lastLogin: "",
        };
  });

  useEffect(() => {
    const fetchData = async () => {
      const datavalue = { token: localStorage.getItem("Session") };

      if (localStorage.getItem("Session") !== null) {
        try {
          const response = await axios.post(
            `${urlServices}backend-users/validate-token`,
            datavalue
          );

          setUserAuth({
            ...UserAuth,
            id: response.data.backendUser.id,
            firstName: response.data.backendUser.firstName,
            lastName: response.data.backendUser.lastName,
            allname:
              response.data.backendUser.firstName +
              " " +
              response.data.backendUser.lastName,
            documentId: response.data.backendUser.documentNumber,
            email: response.data.backendUser.email,
            phone: response.data.backendUser.phone,
            avatar: null,
            profile_id: response.data.backendUser.roleId,
            profile_name: null,
            createdAt: response.data.backendUser.createdAt,
            status: response.data.backendUser.status,
            lastLogin:
              response.data.backendUser.logSystem.length > 0
                ? response.data.backendUser.logSystem[0].createdAt
                : "",
          });
        } catch (error) {
          // Manejar errores aquí, por ejemplo, mostrar un mensaje de error o realizar alguna acción específica
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const LoginAuth = (userData) => {
    setUserAuth({
      ...UserAuth,
      id: userData.backendUser.id,
      Session: userData.token,
      firstName: userData.backendUser.firstName,
      lastName: userData.backendUser.lastName,
      allname:
        userData.backendUser.firstName + " " + userData.backendUser.lastName,
      documentId: userData.backendUser.documentNumber,
      email: userData.backendUser.email,
      phone: userData.backendUser.phone,
      avatar: null,
      profile_id: userData.backendUser.roleId,
      profile_name: null,
      createdAt: userData.backendUser.createdAt,
      status: userData.backendUser.status,
      lastLogin:
        userData.backendUser.logSystem.length > 0
          ? userData.backendUser.logSystem[0].createdAt
          : "",
    });
    localStorage.setItem("Session", userData.token);
  };

  const LogoutAuth = () => {
    setUserAuth({
      ...UserAuth,
      id: "",
      firstName: "",
      lastName: "",
      allname: "",
      documentId: "",
      email: "",
      phone: "",
      avatar: null,
      profile_id: "",
      profile_name: null,
      createdAt: "",
      status: "",
      lastLogin: null,
    });
    localStorage.removeItem("Session");
  };
  const UpdateUserAuth = (newUserData) => {
    setUserAuth({
      ...UserAuth,
      ...newUserData,
    });
  };

  return (
    <Provider
      value={{
        urlServices,
        urlWeb,
        keyLoginGoogle,
        keyMapGoogle,
        UserAuth,
        LoginAuth,
        LogoutAuth,
        UpdateUserAuth,
      }}
    >
      {children}
    </Provider>
  );
}

export {
  UrlServicesProvider,
  Consumer as urlServicesConsumer,
  UrlServicesContext,
};
