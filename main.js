/**
 * KBRA Code Screen
 *
 * @author Mike Klepper
 * @date 10 May 2017
 * @description "As a clock enthusiast, I want to know how many times a clock tower
 * will ring its bell between two given times so that I can plan to sing along."
 * Sung bel canto, no doubt! :-)
 */

var bellCounter;

var goodTests =
    [
        {start:"02:00", end:"03:00", expectedValue:5},
        {start:"14:00", end:"15:00", expectedValue:5},
        {start:"14:23", end:"15:42", expectedValue:3},
        {start:"23:00", end:"01:00", expectedValue:24},
        {start:"16:00", end:"16:00", expectedValue:160},
        {start:"16:45", end:"15:36", expectedValue:152}
    ];

var badTests =
    [
        {start:"24:00", end:"03:00", expectedValue:null},
        {start:"14:00", end:"15", expectedValue:null},
        {start:"-4:23", end:"15:02", expectedValue:null},
        {start:"23:00", end:"01:80", expectedValue:null}
    ];

function onPageLoad()
{
    bellCounter = new BellCounter();

    // Create test case UI
    generateTestCaseUI("testCases", "Valid Input Test Cases", goodTests);
    generateTestCaseUI("testCases", "Invalid Input Test Cases", badTests);

    // Assign event handlers
    button1.onclick = button1Clicked;
    clearOutputButton.onclick = clearOutputButtonClicked;
    clearAllButton.onclick = clearAllButtonClicked;

    // Get ready for input!
    inputText1.focus();
}


/**
 * generateTestCaseUI - generates a list of buttons for each object in the testCases array
 *
 * @param holderId - ID of element in DOM tree
 * @param groupTitle - title of the button list
 * @param testCases - array of test case objects
 */
function generateTestCaseUI(holderId, groupTitle, testCases)
{
    var buttonListHTML = groupTitle + ":<br />";

    for(var i = 0; i < testCases.length; i++)
    {
        buttonListHTML += "<button " +
            "id=\"test" + i + "Button\" " +
            "onclick=\"runTest('" + testCases[i].start + "', '" + testCases[i].end + "', " + testCases[i].expectedValue + ")\">";
        buttonListHTML += testCases[i].start + " - " + testCases[i].end;
        buttonListHTML += "</button>";
    }
    buttonListHTML += "<br />";

    document.getElementById(holderId).innerHTML += buttonListHTML;
}

/***
 * runTest - callback for the test case UI buttons
 *
 * NOTE: since onclick handlers (and their arguments) are written in the generateTestCaseUI function,
 * there is no need to return a curried function.
 *
 * @param startTime
 * @param endTime
 * @param expectedValue
 */
function runTest(startTime, endTime, expectedValue)
{
    // Populate UI and simulate a button click
    inputText1.value = startTime;
    inputText2.value = endTime;
    var bellCount = button1Clicked();

    // Show expected result and check that it matches the value returned by bellCounter.countBells
    outputText.value += "Expected Result: " + expectedValue + "\n";

    if(bellCount === expectedValue)
    {
        outputText.value += "Test Passed!" + "\n";
    }
    else
    {
        outputText.value += "Test Failed!" + "\n";
    }
}

function button1Clicked()
{
    outputText.value = "";

    var startTime = inputText1.value;
    var endTime = inputText2.value;
    outputText.value += "Start Time: " + startTime + "\n";
    outputText.value += "End Time: " + endTime + "\n";

    var bellCount = bellCounter.countBells(startTime, endTime);

    if(bellCount)
    {
        outputText.value += "Number of Bell Rings: " + bellCount + "\n";
    }
    else
    {
        outputText.value += "Number of Bell Rings: null" + " - invalid input!\n";
    }

    return bellCount;
}

function clearOutputButtonClicked()
{
    outputText.value = "";
}

function clearAllButtonClicked()
{
    inputText1.value = "";
    inputText2.value = "";
    outputText.value = "";
    inputText1.focus();
}