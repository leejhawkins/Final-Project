
import React from "react";
import "./style.css";

<div id="accordion" class="ui-accordion ui-widget ui-helper-reset" role="tablist">
    <h3 class="ui-accordion-header ui-corner-top ui-state-default ui-accordion-header-active ui-state-active ui-accordion-icons" role="tab" id="ui-id-1" aria-controls="ui-id-2" aria-selected="true" aria-expanded="true" tabindex="0"><span class="ui-accordion-header-icon ui-icon ui-icon-circle-arrow-s">
    
    </span>Enter Workouts</h3>

    <div class="ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active" id="ui-id-2" aria-labelledby="ui-id-1" role="tabpanel" aria-hidden="false" style="display: block;">
      
      <ul>
        <li>Log a Workout</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Movements</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Time</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
      </ul>
    </div>
    
    <h3 class="ui-accordion-header ui-corner-top ui-accordion-header-collapsed ui-corner-all ui-state-default ui-accordion-icons" role="tab" id="ui-id-3" aria-controls="ui-id-4" aria-selected="false" aria-expanded="false" tabindex="-1"><span class="ui-accordion-header-icon ui-icon ui-icon-circle-arrow-e">
        </span>Planned Workouts</h3>
    <div class="ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content" id="ui-id-4" aria-labelledby="ui-id-3" role="tabpanel" aria-hidden="true" style="display: none;">
   
    <ul>
        <li>Log a Workout</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Movements</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Time</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
      </ul>
    
    </div>
    <h3 class="ui-accordion-header ui-corner-top ui-accordion-header-collapsed ui-corner-all ui-state-default ui-accordion-icons" role="tab" id="ui-id-5" aria-controls="ui-id-6" aria-selected="false" aria-expanded="false" tabindex="-1"><span class="ui-accordion-header-icon ui-icon ui-icon-circle-arrow-e">
        </span>Power BI</h3>
    <div class="ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content" id="ui-id-6" aria-labelledby="ui-id-5" role="tabpanel" aria-hidden="true" style="display: none;">
    <ul>
        <li>Log a Workout</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Movements</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Time</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
      </ul>
    </div>
    <h3 class="ui-accordion-header ui-corner-top ui-accordion-header-collapsed ui-corner-all ui-state-default ui-accordion-icons" role="tab" id="ui-id-7" aria-controls="ui-id-8" aria-selected="false" aria-expanded="false" tabindex="-1"><span class="ui-accordion-header-icon ui-icon ui-icon-circle-arrow-e"></span>SharePoint Sites</h3>
    <div class="ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content" id="ui-id-8" aria-labelledby="ui-id-7" role="tabpanel" aria-hidden="true" style="display: none;">
    <ul>
        <li>Log a Workout</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Movements</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
        <li>Enter Time</li>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul>
      </ul>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
    $(function () {
      var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
      };

      $("#accordion").accordion({
        icons: icons,
        collapsible: true,
        heightStyle: "content"
      });

      $("#toggle").button().on("click", function () {
        if ($("#accordion").accordion("option", "icons")) {
          $("#accordion").accordion("option", "icons", null);
        } else {
          $("#accordion").accordion("option", "icons", icons);
        }
      });
    });
  </script>
