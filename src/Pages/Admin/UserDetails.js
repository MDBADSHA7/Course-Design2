import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import primaryAxios from "../../Api/primaryAxios";
import useAllCourse from "../../Hooks/useAllCourse";
import { successToast } from "../../utils/utils";
import PreLoader from "../Shared/Loading/PreLoader";
import SendMessage from "./SendMessage";

const CourseRow = (course) => {
  const [admission, job, language] = useAllCourse.useAllCourse();
  const courseData =
    admission?.data?.find((s) => s.uname === course?.course.uname) ||
    language?.data?.find((s) => s.uname === course?.course.uname) ||
    job?.data?.find((s) => s.uname === course?.course.uname);
  return (
    <tr>
      <td className="p-0 px-2">
        <img src={course?.course.img} className="w-20" alt="" />
      </td>
      <td>
        <h1>{course?.course?.name}</h1>
        <p className="text-xs">{courseData?.instructor}</p>
      </td>
      <td className="flex justify-center">
        <div
          className="radial-progress bg-secondary text-primary-content border-4 border-secondary text-xs"
          style={{
            "--value":
              (course?.course?.progress?.length / courseData?.videos?.length) *
                100 || 0,
            "--size": "35px",
          }}
        >
          {(course?.course?.progress?.length / courseData?.videos?.length) *
            100 || 0}
        </div>
      </td>
    </tr>
  );
};

const UserDetails = () => {
  const { email } = useParams();
  const [send, setSend] = useState(false);
  const [history, setHistory] = useState(false);
  const [aLoading, setALoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["ourUsers"], () => primaryAxios.get(`/user`));
  const userData = users?.data?.find((s) => s?.email === email);
  // make admin
  const handleMakeAdmin = (id) => {
    setALoading(true);
    (async () => {
      const { data } = await primaryAxios.put(`/user-role?id=${id}`, {
        role: "admin",
      });
      if (data.success) {
        successToast(`${userData?.name} Is Now Admin`)
        refetch();
        setALoading(false);
      }
    })();
  };
  // remove admin
  const handleDelete = (id) => {
    setLoading(true);
    (async () => {
      const { data } = await primaryAxios.put(`/user-role?id=${id}`, {
        role: "",
      });
      if (data.success) {
        successToast(`${userData?.name} Removed From Admin`)
        refetch();
        setLoading(false);
      }
    })();
  };

  const { data: myCourse } = useQuery(["myCourses", email], () =>
    primaryAxios.get(`/mycourse?email=${email}`)
  );

  if (isLoading) {
    <PreLoader />;
  }
  return (
    <div className="flex lg:flex-row flex-col items-start gap-4 lg:m-4 m-2">
      <div className="lg:w-5/12 w-full mx-auto h-full border border-neutral rounded-xl shadow-2xl bg-base-100">
        <div>
          <div className="items-center form-control">
            <div>
              <img
                src={`${
                  userData?.image
                    ? userData?.image
                    : "https://cdn3d.iconscout.com/3d/premium/thumb/profile-5590850-4652486.png"
                }`}
                className="w-32 h-32 rounded-full m-2"
              />
            </div>
            <h1 className="text-2xl font-bold">
              {userData?.name ? userData?.name : "- - -"}
              {userData?.gender === "Male" && (
                <i className="fa-solid fa-mars text-primary ml-2"></i>
              )}
              {userData?.gender === "Female" && (
                <i className="fa-solid fa-venus text-secondary ml-2"></i>
              )}
            </h1>
            <h1 className="text-sm opacity-60">
              {userData?.email ? userData?.email : "- - -"}
            </h1>
            <h1 className="text-lg">
              {userData?.profession ? userData?.profession : "- - -"}
            </h1>
            <div className="stats form-control">
              <div className="stat place-items-center">
                <div className="stat-value">1</div>
                <div className="stat-desc">Course</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-value text-secondary">20</div>
                <div className="stat-desc text-secondary">Video</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-value">50</div>
                <div className="stat-desc">Quiz</div>
              </div>
            </div>
          </div>
          <div className="grid gap-1 m-4">
            {userData?.role === "admin" ? (
              <>
                {userData?.email === "shahedali734@gmail.com" ? (
                  <button className="btn btn-sm btn-secondary btn-outline">
                    Master Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(userData?._id)}
                    className={`btn btn-sm btn-outline ${loading && "loading"}`}
                  >
                    Remove Admin
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => handleMakeAdmin(userData?._id)}
                className={`btn btn-sm btn-secondary btn-outline ${
                  aLoading && "loading"
                }`}
              >
                Make Admin
              </button>
            )}
            <div>
              <div className="flex items-center justify-center gap-3 mt-2">
                <button
                  onClick={() => setSend(true)}
                  className="btn btn-info btn-outline btn-sm"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setHistory(true)}
                  className="btn btn-info btn-outline btn-sm"
                >
                  Message History
                </button>
                <SendMessage
                  send={send}
                  back={() => setSend(false)}
                  user={userData}
                />
                <SendMessage
                  history={history}
                  back={() => setHistory(false)}
                  user={userData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body py-2 flex-row">
          <div>
            <h1>
              <i className="fa-solid fa-clock"></i>
            </h1>
            <h1>
              <i className="fa-solid fa-square-phone"></i>
            </h1>
            <h1>
              <i className="fa-solid fa-location-dot"></i>
            </h1>
            <h1>
              <i className="fa-solid fa-graduation-cap"></i>
            </h1>
            <h1>
              <i className="fa-solid fa-heart text-red-500"></i>
            </h1>
            <h1>
              <i className="fa-solid text-yellow-600 fa-bookmark"></i>
            </h1>
          </div>
          <div>
            <h1>Joined</h1>
            <h1>Phone</h1>
            <h1>Address</h1>
            <h1>Education</h1>
            <h1>Reputation</h1>
            <h1>Rank</h1>
          </div>
          <div>
            <h1 className="ml-8">
              {userData?.joinDate ? userData?.joinDate : "- - -"}
            </h1>
            <h1 className="ml-8">
              {userData?.phone ? userData?.phone : "- - -"}
            </h1>
            <h1 className="ml-8">
              {userData?.address ? userData?.address : "- - -"}
            </h1>
            <h1 className="ml-8">
              {userData?.education ? userData?.education : "- - -"}
            </h1>
            <h1 className="ml-8">000</h1>
            <h1 className="ml-8 capitalize">{userData?.role || "Newbie"}</h1>
          </div>
        </div>
        <div className="card-body py-2 gap-0">
          <h1>
            <i className="fa-solid fa-user-tie mr-1 text-red-500"></i>About Me
          </h1>
          <p>{userData?.bio ? userData?.bio : "- - -"}</p>
        </div>
        <div className="card-body flex-row gap-5 justify-center py-5 text-2xl">
          <a
            href={userData?.facebookLink ? userData?.facebookLink : "- - -"}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href={userData?.instaLink ? userData?.instaLink : "- - -"}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href={userData?.linkedInLink ? userData?.linkedInLink : "- - -"}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="bg-base-200 rounded-xl border border-neutral lg:w-7/12 w-full h-full lg:block">
        <h1 className="text-lg p-2 border-b border-neutral">
          Purchased Courses:
        </h1>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {myCourse?.data?.map((course, index) => (
              <CourseRow key={index} course={course} />
            ))}
          </tbody>
        </table>
        {!myCourse?.data && (
          <AiOutlineLoading3Quarters
            size={40}
            className="mx-auto my-3 fill-primary animate-spin"
          />
        )}
        {!myCourse?.data?.length && (
          <p className="text-center border-t border-neutral py-3">
            No Course Purchased!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
