# FlightInspectionWebApp
#### Created by:
- Matan Saloniko
- Raviv Haham
- Peleg Haham
- Idan Givati


Project Description
-
In this project, we worked on several features:
- We created an web application that allows the user to upload 2 csv files, then learn from the first flight and checks for anomalies about the second flight and writes them to  the block on the screen.
- An youtube clip that explains our work: 


## Requirements:

- Node.js is necessary in order to run the the project.
- After installation, run the server and start investigate the anomalies.

## Project structure:

In this project we focused on MVC- model,view,controller, that could be seen a lot throughout the code.
We created a View ("index.html" and it's design "style.css". This view have a controller- "expServer.js" and Model- "anomalyHandler.js" of it's own.
Please note, that the logic part of the "anomalyHandler.js" file was created by our course staff- Eliahu Khalastchi over at BIU and was not created by us, so just the casting to Java Script was made by us. Full credit for this specific implementaion goes to him.

![UML](https://i.imgur.com/FNQjCmi.png)

[Classes Description](FlightInspectionApp/ClassDetails.md)


## Running this project on a brand new machine:

- First you will need to install Visual Studio Code.
	Download page:
	https://visualstudio.microsoft.com/
	We recommend getting the community version of Visual Studio. Although, any other version would work just fine.
- Install Node.js (as mentioned above).

### Running

- Open the files in Visual Studio Code.
- To run the application press on "Terminal"->"New Terminal", then you will have to write over the command line that was opend "cd controller" and after that write       "node .\expServer.js" in order to run this project.
- Upload your xml file that describes the flight's values (you can build your own but we have provided a file for example that would work).
- Upload your csv file with the flight's values (again, you can provide your own but one is provided inside the project's folder).
- Enjoy!

### Another running method

- Clone the repo using git clone and write the relevant commands to run the project.

## Future improvements:

As we continue to work on this app, we encourage anyone that wants to help out to do so!
Just open the project in Visual Studio Code and add your own touches!
Other than that, we would appreciate if you would try to stick to our design language and patterns.
Have fun with this project and don't forget to create a pull request once you're done so this project could have a little bit of YOU in it!
