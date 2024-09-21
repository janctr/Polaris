# J43 POLARIS Qlik Mashup

### Files that are included in the mashup named "Polaris" in the Dev Hub

#### Main files

-   `Polaris.qext`
-   `Polaris.js`
-   `Polaris.html`
-   `data.js`
-   `styles.css`

#### Component Templates

-   `navigation.html`
-   `qlik-navigation-bar.html`

#### Page Templates

-   `home.ng.html`
-   `log-functions.ng.html`
-   `classes-of-supply.ng.html`

#### Assets

-   `advana_favicon.ico`
-   `advana.png`

#### About

This mini web application is built using the Qlik mashup capabilities. Development is done on NIPR and code is pushed up to SIPR. The data behind this web app is pulled from a Qlik app. This QVF doesn't exist in this repository.

This mashup uses AngularJS. Here are the [docs](https://help.qlik.com/en-US/sense-developer/May2024/Subsystems/Mashups/Content/Sense_Mashups/Howtos/mashups-use-angularjs-in-mashup.htm) that outline how to incorporate Angular in your Qlik Mashup.

#### Application Structure

`Polaris.html` is the entrypoint of the mashup. It is where Angular is defined and where all the file dependencies are linked.

`Polaris.js` is where all the business logic is defined. It is where services, components, routing is defined. The Qlik API is leveraged heavily.

##### Components

-   `navigation.html` and `qlik-navigation-bar.html` are angular components are that are used in every page.

##### Pages

-   `home.ng.html`, `log-functions.ng.html`, `classes-of-supply.ng.html` are the pages defined in the main JS file. They all have corresponding controllers that are defined in `Polaris.js`.

#### Editing

Only I (Jan Iverson Eligio) have access to directly change this code in the Dev Hub. But collabotors are free to fork this repository and make pull requests. If I were to leave, in order to grant access for another user to make changes to Polaris, the following steps have to be taken:

-   I delete Polaris from the Dev Hub
-   A person would be designated as the person that makes change to Polaris
-   They create a mashup in the Dev Hub called "Polaris"
-   All the aforementioned files need to be uploaded/copy/pasted to that mashup in the Dev Hub

#### What is the Dev Hub?

The Dev Hub is where Qlik extensions or mashups are created and edited.

It can be accessed at the following URL based on NIPR/SIPR:[https://qlik.advana.data(.smil).mil/dev-hub]()

#### How do I access Polaris?

Mashups have the following URLs based on NIPR/SIPR: [https://qlik.advana.data(.smil).mil/extensions/Polaris/Polaris.html]()

#### Tips

-   You can access the developer view of a Qlik app by removing /state/analysis in the URL and replacing it with /options/developer.
-   Development is painful. You have to copy and paste from your editor back to the mashup editor.
-   Helpful shortcut to copy everything in a page: CTRL+A or CMD+A
