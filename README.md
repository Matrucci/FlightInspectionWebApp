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


## DLL:
Throughout the project we used dll files several times:
AnomalyDetectorDLL.dll, AnomalyDetectorLineDLL.dll , AnomalyDetectorCircleDLL.dll , CSdll.dll

We used AnomalyDetectorDLL.dll to find the correlative fields and the regression line, which we saved on the mapCSV map, and this helped us to build the graphs of user stories 6, 7 and 8. We used AnomalyDetectorCircleDLL.dll and AnomalyDetectorLineDLL.dll that help us to show different kind of researchers that the anomaly detection algorithm find them so that the user can load a first dynamic algorithm that detects an anomaly using a line regration, investigate the flight with it and then load another algorithm that detects anomalies by circle.
Note that the CSdll.dll file is written in c# (compared to the other dll files that written in c++), it is loaded dynamically by the user, which allows great flexibility and thus the user can connect any algorithm he wants.
CSdll.dll should only call the "getAnomaly" method that it's arguments are:
string CSVLearnFileName, string CSVTestFileName, string txtFileName, and returns nothing (void), so it's signiture is: 
public static extern void getAnomaly(string CSVLearnFileName, string CSVTestFileName, string txtFileName)
The user who prepares the CSdll.dll file should make sure that in the first line he writes the shape with which he wanted to study the flight (regression line, circle etc.) A line below he will write for each pair of correlative fetures: the name of the properties, a line below will write the indexes of the regration in their set of values, and in the line below he will write the x points (and below the y points) that creates the shape in which he investigated the anomalies.

## Running this project on a brand new machine:

- First you will need to install Visual Studio.
	Download page:
	https://visualstudio.microsoft.com/
	We recommend getting the community version of Visual Studio. Although, any other version would work just fine.
- Installing FlightGear (as mentioned above).

### Running

- Open the sln file in Visual Studio.
- To run the application press ctrl+F5 in order to run without debugging.
- Run the FlightGear application with the configurations above.
- Upload your xml file that describes the flight's values (you can build your own but we have provided a file for example that would work).
- Upload your csv file with the flight's values (again, you can provide your own but one is provided inside the project's folder).
- Enjoy!

### Another running method

- Clone the repo using git clone.
- Type the following command:

> cd \FlightInspectionApp\FlightInspectionApp\FlightInspectionApp\bin\x86\Debug

- Then run the FlightInspectionApp.exe

## Future improvements:

As we continue to work on this app, we encourage anyone that wants to help out to do so!
Just open the project in Visual Studio and add your own touches!
This project uses OxyPlot in order to build and display and graphs so you will probably want to get familiar with that.
Other than that, we would appreciate if you would try to stick to our design language and patterns.
Have fun with this project and don't forget to create a pull request once you're done so this project could have a little bit of YOU in it!
