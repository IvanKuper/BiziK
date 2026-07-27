import { FunctionComponent, useEffect, useState } from "react";
import { errorMsg } from "../services/feedbackService";
import { getUser } from "../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { BadgeCheck, User as UserIcon } from "lucide-react";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [userProfile, setUserProfile] = useState<any>({
    id: "",
    name: "",
    email: "",
    biz: false,
  });
  useEffect(() => {
    getUser()
      .then((result) => {
        setUserProfile(result.data);
      })
      .catch((err) => {
        errorMsg("Something went Wrong, Try Agian");
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-md px-4 py-10">
          <h1 className="mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold text-slate-800 dark:text-slate-100">
            <UserIcon size={24} /> My Profile
          </h1>
          <div className="animate-fade-in rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">
            <img
              src="profile1.svg"
              alt="profile"
              className="mx-auto w-40"
            />

            <div className="mt-6">
              <div className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {userProfile.name}
              </div>
              <hr className="my-4 border-slate-200 dark:border-slate-700" />
              <div className="mb-2 text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-100">
                  Email:{" "}
                </strong>
                {userProfile.email}
              </div>
              <div className="mb-2 text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-100">
                  Regular/Business{" "}
                </strong>
                {userProfile.biz ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    Business <BadgeCheck size={16} />
                  </span>
                ) : (
                  <span>Regular</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
