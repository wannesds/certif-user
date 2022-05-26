# Verifiable Credentials with Solid and Blockchain

A proposed system for Verifiable Credentials using [Solid](https://solidproject.org/) and Blockchain technology. 
- Solid for data storing, management and identity verification.
- Ethereum (as used Blockchain tech) for storing the data integrity of a credential.

This project was created by [Wannes Dieltiens](https://wannes.xyz) under project guidance of Christophe Cop for [Konsolidate](https://www.konsolidate.eu/) during an internship.

[Blogpost about the project](https://www.konsolidate.eu/stories/vc-solid-blockchain).

MIT license in LICENSE.md

Any questions? Feel free to contact me at wannesdieltiens@gmail.com or on [LinkedIn](https://www.linkedin.com/in/wannes-dieltiens/)

## Demo

[Issuer App repo](https://github.com/wannesds/certif-issuer)
[User App repo](https://github.com/wannesds/certif-user)
[Validator App repo](https://github.com/wannesds/certif-validator)

Metamask plugin or a similar wallet provider with an ethereum account and Solid data-pods are required for testing out the applications.
Do not try to test this without any experience with Ethereum.
Ethereums Rinkeby test-network was used to build and test this project.

Its recommended to run all 3 applications simultanously ( localhost:3000/3001/3002 )
Solid-pod used as issuer also has to manually give permission to user-app ( localhost:3001 )
Solid-pod used as user also has to manually give permisson to validator-app ( localhost:3002 )

### Tech-stack

Project is bootstrapped with React.
- external tech used : Metamask, Solid data-pod
- libraries used :
    "@alch/alchemy-web3": "^1.1.1",
    "@inrupt/solid-client": "^1.10.0",
    "@inrupt/solid-ui-react": "^2.3.1",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "etherscan-api": "^10.0.5",
    "merkletreejs": "^0.2.21",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "sass": "^1.37.5",
    "web-vitals": "^1.1.2",
    "web3": "^1.3.6"

#### Known Bugs

- Extract, show and use data for validation process from actual certif and not userWebId + certif .ttl name
- Make validator only see/access certifs that they should.
- User-app , make quelist auto delete item when stored
- Make apps also request and write app-access to the next app in the order (issuer needs to give perm to user-app, user needs to give perm to validation-app) 
- Issuer stored a new thing in public eth address file for every certification created, should only by done once except if issuer uses a different eth address at some point

##### To-do

- re-use more css and js code
- Upgrade the current styling (currently bare minimum)
- fix first letter capital/not of components, its kinda scrambled
- Rename css parts and their class name for more generalisation and consistency
- Delete unused code , except if it would hold any value in the development process or good alternative ways
- Alter and add more comments
- Have consistent and correct name usage (ex. issuer, holder, verifier)
