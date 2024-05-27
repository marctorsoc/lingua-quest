Disclaimer: this repo is very far from well-written code, but hey, my first react native project, and it works!

# Table of Contents

- [Running](#running)
- [Debugging](#debugging)
- [Building](#building)
- [Bootcamp video index](#bootcamp-video-index)
- [Pending work](#pending-work)

To install, run `npm install`

# Running

To start the app, `npm start`

To run it offline `npx expo start --offline`

# Debugging
Running react-dev-tools. In a separate terminal, run `react-dev-tools`. This should open a new window

# Building

## First time

* `npm install --global eas-cli`
* `eas init --id a9...`
* `eas build:configure`

## Once everything configured

Just run `eas build -p android --profile preview`, and wait for some time (> 10min):
```bash
~/...../caption-master ❯ eas build -p android --profile preview
✔ Using remote Android credentials (Expo server)
✔ Using Keystore from configuration: Build Credentials y-NTnpaOgo (default)

Compressing project files and uploading to EAS Build. Learn more
✔ Uploaded to EAS 2s

Build details: https://expo.dev/accounts/marc.torsoc/projects/caption-master/builds/cb2dfa67-5f3e-4b45-afd6-6afcbc8ecfc0
```

# Bootcamp video index

[Link to video](https://www.youtube.com/watch?v=qi87b6VcIHY)

- 00:00 Intro React-Native
- 03:10 Expo
- 05:10 Creando la app
- 10:07 Configurando iOS simulator
- 12:26 react-native-debugger
- 15:40 Linter
- 17:30 Text, View, Touchable
- 25:00 StatusBar y expo-constants
- 29:30 Mostrando los repositorios
- 32:37 ScrollView y FlatList
- 40:15 Desactivando reglas linter
- 41:00 StyleSheet, theme y estilos
- 54:38 FlexBox. Alineando texto y stats
- 01:02:00 ParseThousands
- 01:04:19 Estilando language
- 01:07:05 alignSelf: flex-start
- 01:08:10 BorderRadius y overflow
- 01:08:40 Image. Mostrando repo image
- 01:11:00 FlexBox. Mostrando image side by side
- 01:18:20 MarginHorizontal y MarginVertical
- 01:19:20 AppBar
- 01:25:00 react-router-native
- 01:28:30 Problemas con react-router-native
- 01:29:30 Solucion: webpack-config
- 01:34:50 Routeando
- 01:40:50 Scroll para las tabs
- 01:49:00 Preguntas
- 02:07:40 Inicio clase 2
- 02:11:30 StatusBar
- 02:14:25 Plarform.select
- 02:26:00 Sign in con Formik
- 02:40:25 Formik: useField
- 02:45:15 Masking the password
- 02:46:15 Preguntas
- 02:50:30 Validacion de formulario
- 02:57:40 Validacion con yup
- 03:04:00 Configurando el backend
- 03:09:15 Queries a la REST API
- 03:13:30 global.fetch y globalThis
- 03:14:30 custom hook useRepositories
- 03:17:50 Arreglando errores por localhost
- 03:20:20 ApolloClient
- 03:23:35 GraphQL
- 03:26:45 Usando graphQL en el custom hook
- 03:30:00 Preguntas

# Pending work

- Tech debt i8n
    - add logo of language to title of tab, see https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
    - Add tooltip to catalog item's corner to show num episodes and other
    information
    - Add logo of movie / tv series / book to both catalog and library
- Search for better translation models for
    - ca -> es
- Finish filter once new data with movies / books is added
- Add ability to add stories from Google Drive
- Add a counter for clean sheets, and congrat the user
- Allow select multiple stories to delete, and disselect by tapping again. But if multiple invalidate edit button.
- Add refreshControl to refresh stories by pulling down in LibraryOutput
- Add ability to sort stories in SortAndFilter
- Find Picker with lower width in Android
- Add modal to select what data to reset, and what data to load
- Search how to center text in Picker and PickerOptions
- Add ability to backup data to filesystem
- Use react-native-paper
- Change fonts VScode like in Bootcamp
- Add tests
- GH actions to auto-release with every push to master

