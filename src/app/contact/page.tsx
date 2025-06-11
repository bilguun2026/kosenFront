function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white kosenText1 kosenBorder border rounded-lg shadow-lg my-12 relative z-40">
      <h1 className="text-3xl font-bold mb-6">Холбоо барих</h1>

      <div className="space-y-4 text-lg">
        <p>Монгол Улс, Улаанбаатар хот Бага тойруу, ШУТИС VIII-байр</p>
        <p>(976)-77110096, (976)-77110097</p>
        <p>
          <a
            href="mailto:must-kosen@must.edu.mn"
            className="kosenText1 underline"
          >
            must-kosen@must.edu.mn
          </a>
        </p>
      </div>

      <div className="mt-8 w-full h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1585.8068208035486!2d106.92600803631959!3d47.92159791249783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930065aab635%3A0xe8a59c9f75c0187d!2z0YjRg9GC0LjRgS3QutC-0L7RgdGN0L0g0YLQtdGF0L3QvtC70L7Qs9C40LnQvSDQutC-0LvQu9C10LY!5e1!3m2!1sen!2smn!4v1748794763985!5m2!1sen!2smn"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0 rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
