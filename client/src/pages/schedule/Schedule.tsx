import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MdCalendarToday } from "react-icons/md";
import AddShiftModal from "../../component/shifts/modal/AddShiftModal";
import AssignShiftModal from "../../component/schedule/modal/AssignShiftModal";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//DND specific code
export const Box = ({ id, shift }: { id: string; shift: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { shift, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ id: string }>();
      if (item && dropResult) {
        alert(`You dropped ${item.shift} into user!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      ref={drag}
      className=" pb-1 text-sm"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {shift}
    </div>
  );
};

export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      data-testid="dustbin"
      className={`${isActive ? "bg-gray-300" : "bg-gray-200"} w-full h-[60px]`}
    >
      &nbsp;
    </div>
  );
};

export interface Shift {
  _id: string;
  date: string;
  start_time: string;
  end_time: string;
  position: string;
  description?: string;
  isAssigned?: boolean;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  shifts: string[];
}

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [addShiftModal, setAddShiftModal] = useState(false);
  const [assignShiftModal, setAssignShiftModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<User | null>(null);
  const [selectedEmpDate, setSelectedEmpDate] = useState<string | null>(null);
  console.log(users);

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
      (shift) => shift._id === userId && dayjs(shift.date).isSame(dayjs(date))
    );
  };

  //* To get the available shift of a particular date
  const getShiftForDay = (date: string | null) => {
    return shifts.filter((shift) =>
      dayjs(shift.date).isSame(dayjs(date), "date")
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex justify-between w-full p-4 rounded bg-primaryGold text-surface items-center">
        <span className="font-semibold text-xl">Schedule</span>

        <button
          onClick={() => setAddShiftModal(true)}
          className="bg-primary text-surface px-4 py-2 rounded"
        >
          Add new shift
        </button>
      </div>

      <AddShiftModal opened={addShiftModal} setOpened={setAddShiftModal} />

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
      <DndProvider backend={HTML5Backend}>
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
                      <div className="py-1 flex flex-col">
                        {shiftsForDate.map((shift, index) => (
                          <Box
                            key={index}
                            id={String(index)}
                            shift={`${shift.start_time} - ${shift.end_time}`}
                          />
                        ))}
                      </div>
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
                    className="text-center border border-gray-500 h-full"
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
                        <div
                          key={shiftIndex}
                          className="flex flex-col px-4 py-2"
                        >
                          <span>
                            {shift.start_time} - {shift.end_time}
                          </span>
                        </div>
                      ))
                    ) : (
                      <Dustbin />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DndProvider>

      <div className="hidden">
        <AssignShiftModal
          opened={assignShiftModal}
          setOpened={setAssignShiftModal}
          selectedEmp={selectedEmp}
          selectedEmpDate={selectedEmpDate}
          availableShifts={getShiftForDay(selectedEmpDate)}
        />
      </div>
    </div>
  );
};

export default Schedule;
