export const jobApi = {
  getJobs: async () => {
    return {
      data: [
        {
          id: 1,
          title: "Frontend Developer",
          company: "Google",
          salary: "₹15 LPA",
        },
        {
          id: 2,
          title: "Backend Developer",
          company: "Microsoft",
          salary: "₹18 LPA",
        },
      ],
    };
  },

  getJobById: async (id) => {
    return {
      data: {
        id,
        title: "Frontend Developer",
        description: "Build UI components...",
        location: "Gurugram",
        salary: "₹15–20 LPA",
      },
    };
  },
};
