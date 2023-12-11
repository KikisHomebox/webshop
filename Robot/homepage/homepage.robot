*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}    headlesschrome
${BASE_URL}    http://localhost:3000

*** Test Cases ***

Click Home Mover Kit checkout phase
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Click Element    xpath=//a[contains(@href, '/products/home-mover-kit')]
    Wait Until Page Contains    text=Start life in your new home the easy way with our Home Mover kit. Packed with stylish, high-quality essentials, this kit offers everything you need at an affordable price, without the hassle of store and product searches. Rest assured that every product has been tested and approved for your peace of mind. Move in and start living with confidence!
    Click Button    Add to cart
    Wait for while
    Wait Until Page Contains    text=Your cart
    Close Browser
    
Edit options in order
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Click Element    xpath=//a[contains(@href, '/products/sauna-pack')]
    Wait Until Page Contains    text=Our Sauna Pack is the perfect way to experience the unique sauna journey of Finland. Crafted with premium materials, this gift is ideal for newcomers looking to immerse themselves in the culture of the sauna capital of the world. With our Sauna Pack, you can enjoy the ultimate sauna experience with unparalleled comfort and luxury.
    Click Button    Add to cart
    Wait for while
    Wait Until Page Contains    text=Your cart
    Close Browser

Test search and finding the product page
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Wait for while
    Click Element  xpath=//a[@href='#search-aside']
    Input Text  name=q  Toilet
    Wait for while
    Click Element  xpath=//span[contains(text(), 'Toilet Brush')]/ancestor::a
    Wait Until Page Contains    text=This Toilet Brush is made of durable plastic and has a bamboo handle for easy and comfortable use. Its size of 116x116x125mm makes it an ideal fit for your bathroom, while the handle at 116x116x360mm provides optimal grip. Its sleek black colour will add a modern touch to your home.
    Close Browser

Test Login page and login
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Wait for while
    Click Element  xpath=//a[@href='/account']
    Wait Until Page Contains    text=Sign in
    
    Input Text  id=email  testi@gmail.com
    Input Text  id=password  testi123
    Click Button    Sign in
    Wait for while
    Wait Until Page Contains   text=Welcome to your account.
    Click Button    Log out
    Close Browser

*** Keywords ***

Wait for while
    Sleep    3