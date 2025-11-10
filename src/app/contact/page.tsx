import { MapPin, Phone, Mail } from "lucide-react";

function ContactUs() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 my-12 bg-white kosenText1 kosenBorder border rounded-2xl shadow-lg relative z-40">
      {/* Header */}
      <div className="mb-8">
        <p className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-yellow-50 border border-[#ffc20c]/40 text-[#b38600] mb-3">
          Холбоо барих
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          KOSEN Коллеж – Холбоо барих мэдээлэл
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Сургалт, элсэн суралцах болон бусад мэдээллийн талаар бидэнтэй доорх
          хаягаар холбогдоорой.
        </p>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Contact info */}
        <div className="space-y-6 h-full">
          <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/60 px-5 py-4 shadow-sm flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-4">Хаяг, утас, имэйл</h2>

            <div className="space-y-4 text-sm md:text-base">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                  <MapPin className="h-4 w-4 text-[#ffc20c]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Хаяг
                  </p>
                  <p className="mt-1">
                    Монгол Улс, Улаанбаатар хот,
                    <br />
                    Бага тойруу, ШУТИС VIII байр
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                  <Phone className="h-4 w-4 text-[#ffc20c]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Утас
                  </p>
                  <div className="mt-1 space-y-0.5">
                    <a
                      href="tel:+97677110096"
                      className="hover:text-[#ffc20c] transition-colors block"
                    >
                      (976) 7711-0096
                    </a>
                    <a
                      href="tel:+97677110097"
                      className="hover:text-[#ffc20c] transition-colors block"
                    >
                      (976) 7711-0097
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                  <Mail className="h-4 w-4 text-[#ffc20c]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Имэйл
                  </p>
                  <a
                    href="mailto:must-kosen@must.edu.mn"
                    className="mt-1 inline-flex items-center text-[#1d4ed8] hover:text-[#ffc20c] underline underline-offset-2 decoration-dotted"
                  >
                    must-kosen@must.edu.mn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[320px] md:h-[420px]">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1585.8068208035486!2d106.92600803631959!3d47.92159791249783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930065aab635%3A0xe8a59c9f75c0187d!2z0YjRg9GC0LjRgS3QutC-0L7RgdGN0L0g0YLQtdGF0L3QvtC70L7Qs9C40LnQvSDQutC-0LvQu9C10LY!5e1!3m2!1sen!2smn!4v1748794763985!5m2!1sen!2smn"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
