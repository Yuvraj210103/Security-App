import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MdCalendarToday } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";

interface Shift {
  _id: string;
  date: string;
  start_time: string;
  end_time: string;
  position: string;
  description?: string;
}

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
}

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  console.log(shifts);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch("/api/shift/getshifts");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setShifts(data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/getusers");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to get shifts for a user on a specific day
  const getUserShiftForDay = (userId: string, date: string) => {
    return shifts.filter(
      (shift) => shift._id === userId && shift.date === date
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex justify-between w-full p-4 rounded bg-primaryGold text-surface items-center">
        <span className="font-semibold text-xl">Schedule</span>

        <button className="bg-primary text-surface px-4 py-2 rounded">
          Save Changes
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="font-medium">
          Week of {dayjs(selectedDate).format("MMM DD, YYYY")}
        </div>
        <DatePickerInput
          rightSection={
            <label>
              <MdCalendarToday size={16} className="cursor-pointer" />
            </label>
          }
          value={selectedDate}
          onChange={(e) => setSelectedDate(e)}
        />
      </div>

      <table className="border-b border-gray-500">
        <thead className="text-sm font-normal">
          <tr>
            <th className="w-[20%] text-center">&nbsp;</th>
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
              <th key={dayIndex} className="w-[11.42%] text-center">
                {dayjs(selectedDate)
                  .startOf("week")
                  .add(dayIndex, "day")
                  .format("MMM-DD - ddd")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {/* This row will have unassigned shifts */}
          <tr className="bg-primaryGold/40">
            <td className="text-start px-2 py-2 border-t border-l border-gray-500 align-bottom font-semibold">
              (Unassigned Shifts)
            </td>
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
              const currentDate = dayjs(selectedDate)
                .startOf("week")
                .add(dayIndex, "day");
              const formattedDate = currentDate.format("MMM DD, YYYY");
              const shiftsForDate = shifts.filter((shift) => {
                const shiftDate = dayjs(shift.date).format("MMM DD, YYYY");
                return shiftDate === formattedDate;
              });

              return (
                <td
                  key={dayIndex}
                  className="text-center px-2 py-2 border border-gray-500"
                >
                  <div className="flex flex-col">
                    {shiftsForDate.map((shift, index) => (
                      <span key={index} className="py-1">
                        {shift.start_time} - {shift.end_time}
                      </span>
                    ))}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* All the employees details */}
          {users.map((user, userIndex) => (
            <tr key={userIndex}>
              <td className="px-4 py-4 text-start border-t border-l border-gray-500">
                <div className="flex flex-col font-semibold">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-xs">
                    {user.role.toUpperCase()} - {user.phone_number}
                  </span>
                </div>
              </td>
              {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                <td
                  key={dayIndex}
                  className="px-4 py-2 text-center border border-gray-500"
                >
                  {getUserShiftForDay(
                    user._id,
                    dayjs(selectedDate)
                      .startOf("week")
                      .add(dayIndex, "day")
                      .format("YYYY-MM-DD")
                  ).length > 0 ? (
                    getUserShiftForDay(
                      user._id,
                      dayjs(selectedDate)
                        .startOf("week")
                        .add(dayIndex, "day")
                        .format("YYYY-MM-DD")
                    ).map((shift, shiftIndex) => (
                      <div key={shiftIndex} className="flex flex-col">
                        <span>
                          {shift.start_time} - {shift.end_time}
                        </span>
                      </div>
                    ))
                  ) : (
                    <FaPlusCircle
                      className="h-5 w-5 m-auto text-blue-500 cursor-pointer"
                      onClick={() => {}}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
