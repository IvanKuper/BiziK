import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Card";
import { getAllCards } from "../services/cardService";
import { errorMsg, getErrorMessage } from "../services/feedbackService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import QrModal from "./QrModal";
import { Contact, ExternalLink, Loader2, QrCode, Search } from "lucide-react";

interface AllcardsProps {}

const Cards: FunctionComponent<AllcardsProps> = () => {
  const [search, setSearch] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);
  const [qrCard, setQrCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    // The free server sleeps when idle; say so instead of a silent spinner
    const slowTimer = setTimeout(() => setIsSlow(true), 3000);
    getAllCards()
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => {
        setLoadFailed(true);
        errorMsg(getErrorMessage(err, "Could not load cards."));
      })
      .finally(() => {
        clearTimeout(slowTimer);
        setIsLoading(false);
      });
    return () => clearTimeout(slowTimer);
  }, []);

  const filteredCards = cards.filter((card) => {
    const q = search.toLocaleLowerCase();
    if (q === "") return true;
    return (
      card.business_name.toLocaleLowerCase().includes(q) ||
      card.business_desc.toLocaleLowerCase().includes(q) ||
      card.business_adress.toLocaleLowerCase().includes(q)
    );
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-1 flex flex-wrap items-center justify-center gap-2 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
            <Contact size={26} /> All BiziK Cards
          </h1>
          <p className="mb-6 text-center text-sm font-medium text-primary-600 dark:text-primary-400">
            [# of cards {cards.length}]
          </p>

          <div className="relative mx-auto mb-8 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-800 outline-none transition-colors focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Search Card Name, Description or Address"
            />
          </div>

          {isLoading ? (
            <div
              className="flex flex-col items-center gap-3 py-16"
              role="status"
            >
              <Loader2
                className="animate-spin text-primary-600"
                size={32}
                aria-label="Loading cards"
              />
              {isSlow && (
                <p className="max-w-sm text-center text-sm text-slate-600 dark:text-slate-300">
                  Waking up the free server. The first load can take up to a
                  minute.
                </p>
              )}
            </div>
          ) : loadFailed ? (
            <p className="py-16 text-center text-slate-600 dark:text-slate-300">
              Could not load cards. Please refresh the page.
            </p>
          ) : filteredCards.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCards.map((card: Card) => (
                <div
                  key={card.card_id}
                  className="animate-fade-in flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900"
                >
                  <div className="flex h-44 items-center justify-center bg-slate-100 dark:bg-slate-800">
                    <img
                      src={card.business_image}
                      className="h-full w-full object-contain p-4"
                      alt={card.business_name}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-center text-lg font-bold text-slate-800 dark:text-slate-100">
                      {card.business_name}
                    </h3>

                    <div className="my-3 flex justify-center gap-2">
                      <a
                        href="https://ivankuper.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                      >
                        <ExternalLink size={14} /> Visit Website
                      </a>
                      <button
                        onClick={() => setQrCard(card)}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        aria-label="Share via QR code"
                      >
                        <QrCode size={16} />
                      </button>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700" />
                    <p className="my-2 text-center text-sm text-slate-600 dark:text-slate-300">
                      {card.business_desc}
                    </p>
                    <hr className="border-slate-200 dark:border-slate-700" />
                    <p className="my-2 text-center text-sm text-slate-600 dark:text-slate-300">
                      {card.business_phone}
                    </p>
                    <hr className="border-slate-200 dark:border-slate-700" />
                    <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
                      {card.business_adress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h4 className="mt-5 text-center text-lg font-medium text-slate-600 dark:text-slate-300">
                {cards.length
                  ? "No cards match your search."
                  : "No cards have been added yet."}
              </h4>
              {!cards.length ? (
                <img className="mt-5 max-w-xs" src="nocards.png" alt="" />
              ) : null}
            </div>
          )}
        </div>
      </div>
      {qrCard ? (
        <QrModal
          value={qrCard.business_phone}
          title={qrCard.business_name}
          onClose={() => setQrCard(null)}
        />
      ) : null}
      <Footer />
    </>
  );
};

export default Cards;
