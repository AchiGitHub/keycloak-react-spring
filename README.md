# Keycloak Springboot ReactJS Theming
---
The theme support is provided by keycloak to customize the look of the user login, register and forgot password pages. The different approaches available to customize the themes in Keycloak are explored in this repository.

### Architecture

Basic architecture of a Project with Keycloak, Springboot Rest API and ReactJS.

![Architecture](https://drive.google.com/uc?export=view&id=1skdlPaOCpx1nwxOsb76v6dZQsJFD_3hN)

### Keycloak Theming

|Name|Resource|Limitation/Advantage|
|----|-----|-------|
|Official Documentation|[Keycloak Theme documentation](https://www.keycloak.org/docs/latest/server_development/index.html#_themes)| <ul><li>Can use material web components</li></ul>|
|Kloakify|[Kolakify documentation](https://github.com/InseeFrLab/keycloakify)| <ul><li>Not widely used</li><li>Configuration issues with react 17</li><li>Low reputation</li></ul>|
|Extend the Token API| <ul><li>Keycloak provides `{{host}}//auth/realms/springboot-react/protocol/openid-connect/token` API endpoint to get the `access_token` and `refresh_token`</li><li>Initiate a public client and integrate the API to get the `access_token`</li></ul>|<ul><li>Need to check the registration of user flow</li><li>Not tested with the behavior of social logins</li></ul>|

#### Official documentation themeing

_Steps to follow to extend the base theme:_

1. **Don't modify the base or keycloak theme available in the keycloak themes folder**
2. First make a copy of the base or keycloak theme available under   `<CONTAINER-ID>:/opt/jboss/keycloak/themes/`
3. Do the changes to the UI
4. Create a new folder with the modified theme under `<CONTAINER-ID>:/opt/jboss/keycloak/themes/`
5. Restart the container
6. The newly created theme will be available under themes in Keycloak admin portal with the folder name as the name
7. Modification of the Freemarker themes with Javascript and CSS are available in [Custom UI Login](https://bitbucket.org/mitesp/keycloack-auth-web/src/a2845db6333e68a58fe9a71deaf13ab92617c829/?at=feature%2Fcustom-login)
      1. Copy the `custom-login-theme` directory to `<CONTAINER-ID>:/opt/jboss/keycloak/themes/`
      2. Restart container 
      3. Select `custom-login-theme` under themes tab on keycloak admin portal

### Keycloak configuration with Docker

[Keycloak Docker Configuration](https://www.keycloak.org/getting-started/getting-started-docker)

[Keycloak Realm, CLients and User Roles configuration](https://www.keycloak.org/docs/latest/server_admin/#configuring-realms)

### Springboot Rest API

- Springboot pom.xml contains the dependency of keycloak adapter
- All the Rest APIs are secured  

```xml
<dependency>
    <groupId>org.keycloak.bom</groupId>
    <artifactId>keycloak-adapter-bom</artifactId>
    <version>${keycloak.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

#### Rest APIs

**All the APIs are secured using Keycloak. Threrefore the JWT obtained from Keycloak must be passed in the header of the request as: `Authorization: Bearer *token*`**

**Get all students: GET** `{{host}}/student`

**Response -** 
```json
[
    {
        "id":1,
        "firstName":"Daenerys",
        "lastName":"Targaryen",
        "email":"jon.snow@north.com"
    }
]
```

**Create student: POST** `{{host}}/student`

**Request Body -**
```json
{
    "firstName":"Daenerys",
    "lastName":"Targaryen",
    "email":"jon.snow@north.com"
}
```

