$(document).ready(function() {
    // Hide error icons by default
    $(".error-icon").hide();

    // Validate number fields
    $("input[type='number']").on("input", function() {
        var inputId = $(this).attr("id");
        var value = $(this).val();
        if (isNaN(value)) {
            $("#" + inputId + "Error").show().attr("title", "Please enter a valid number");
        } else {
            $("#" + inputId + "Error").hide();
        }
    });

    // Validate age dropdown
    $("#age").change(function() {
        var value = $(this).val();
        if (value === "") {
            $("#ageError").show().attr("title", "Please select an age group");
        } else {
            $("#ageError").hide();
        }
    });

    // Form submission
    $("#taxForm").submit(function(event) {
        event.preventDefault();

        // Check for errors
        var errors = false;
        $("input[type='number']").each(function() {
            var value = $(this).val();
            if (isNaN(value) || value === "") {
                errors = true;
                $(this).siblings(".error-icon").show().attr("title", "Please enter a valid number");
            }
        });

        var age = $("#age").val();
        if (age === "") {
            errors = true;
            $("#ageError").show().attr("title", "Please select an age group");
        }

        // If no errors, calculate tax and display modal
        if (!errors) {
            var income = parseFloat($("#income").val());
            var extraIncome = parseFloat($("#extraIncome").val());
            var deductions = parseFloat($("#deductions").val());
            var age = $("#age").val();
            var taxRate;
            if (age === "<40") {
                taxRate = 0.3;
            } else if (age === "≥40 & <60") {
                taxRate = 0.4;
            } else {
                taxRate = 0.1;
            }
            var taxableIncome = income + extraIncome - deductions - 800000;
            var taxAmount = Math.max(0, taxableIncome) * taxRate;

            $("#taxResult").html(taxAmount.toFixed(2));
            $("#modal").show();
        }
    });

    // Close modal
    $(".close").click(function() {
        $("#modal").hide();
    });
});

