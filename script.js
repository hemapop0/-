
// =====================================
// اوصلي - WhatsApp Report System
// =====================================

// رقم الواتساب الخاص بيك
// اكتب رقمك المصري بصيغة دولية بدون +
const phoneNumber = "201150421959";

// عناصر HTML
const description = document.getElementById("description");
const sendWhatsApp = document.getElementById("sendWhatsApp");
const imagesInput = document.getElementById("images");

// بيانات السيارة
const carModel = "Chevrolet Cruze";
const plateNumber = "وه - ٥٧٩٤";


// =====================================
// إرسال البلاغ
// =====================================

sendWhatsApp.addEventListener("click", async function () {

    // المشكلة المختارة
    const selectedProblem = document.querySelector(
        'input[name="problem"]:checked'
    );

    // تفاصيل المشكلة
    const problemDescription = description.value.trim();

    // الصور المختارة
    const selectedImages = Array.from(imagesInput.files);

    // التحقق من رقم الواتساب
    if (!/^20\d{10}$/.test(phoneNumber)) {
        alert("من فضلك اكتب رقم واتساب صحيح في ملف JavaScript");
        return;
    }

    // التحقق من اختيار المشكلة
    if (!selectedProblem) {
        alert("من فضلك اختار نوع المشكلة");
        return;
    }

    // التحقق من التفاصيل
    /* if (problemDescription === "") {
        alert("من فضلك اكتب تفاصيل المشكلة");
        description.focus();
        return;
    } */

    // =====================================
    // تجهيز رسالة البلاغ
    // =====================================

    const message = `
🚗 بلاغ جديد من موقع أوصلي

السلام عليكم، حبيت أبلغك إن في مشكلة متعلقة بعربيتك.

━━━━━━━━━━━━━━

🚘 بيانات السيارة:

نوع السيارة: ${carModel}
رقم اللوحة: ${plateNumber}

━━━━━━━━━━━━━━

⚠️ نوع المشكلة:

${selectedProblem.value}

━━━━━━━━━━━━━━

📝 تفاصيل المشكلة:

${problemDescription}

━━━━━━━━━━━━━━

📷 عدد الصور المختارة: ${selectedImages.length}

برجاء مراجعة المشكلة والتواصل معي.

تم إرسال البلاغ من موقع أوصلي 🚗
`;

    // =====================================
    // تجهيز رابط واتساب
    // =====================================

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`;


    // =====================================
    // إرسال النص والصور
    // =====================================

    if (selectedImages.length > 0) {

        // مشاركة الصور والنص من الجهاز
        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: selectedImages })
        ) {

            try {

                await navigator.share({
                    title: "بلاغ جديد - أوصلي",
                    text: message,
                    files: selectedImages
                });

            } catch (error) {

                if (error.name === "AbortError") {
                    return;
                }

                alert(
                    "تعذرت مشاركة الصور. سيتم فتح واتساب بالرسالة النصية."
                );

                window.open(whatsappURL, "_blank");

            }

        } else {

            // لو المتصفح لا يدعم مشاركة الصور
            window.open(whatsappURL, "_blank");

            alert(
                "تم تجهيز البلاغ. أرفق الصور يدويًا داخل محادثة واتساب."
            );

        }

    } else {

        // إرسال النص فقط إلى رقمك المحدد
        window.open(whatsappURL, "_blank");

    }

});
