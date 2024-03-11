import React, { useState, useEffect } from "react";
import Dialog from "../../../common/Dialog";
import { Shift, User } from "../../../pages/schedule/Schedule";
import dayjs from "dayjs";

const AssignShiftModal = ({
  opened,
  setOpened,
  selectedEmp,
  selectedEmpDate,
  availableShifts,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEmp: User | null;
  selectedEmpDate: string | null;
  availableShifts: Shift[];
}) => {
  const [formData, setFormData] = useState({
    userId: selectedEmp ? selectedEmp._id : "",
    selectedShifts: [] as string[],
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      userId: selectedEmp ? selectedEmp._id : "",
    }));
  }, [selectedEmp]);

  const handleCheckboxChange = (shiftId: string) => {
    // Check if the shiftId is already in the selectedShifts array
    const isShiftSelected = formData.selectedShifts.includes(shiftId);

    if (isShiftSelected) {
      // If the shift is already selected, remove it from selectedShifts
      setFormData((prevData) => ({
        ...prevData,
        selectedShifts: prevData.selectedShifts.filter((id) => id !== shiftId),
      }));
    } else {
      // If the shift is not selected, add it to selectedShifts
      setFormData((prevData) => ({
        ...prevData,
        selectedShifts: [...prevData.selectedShifts, shiftId],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { userId, selectedShifts } = formData;

      for (const shiftId of selectedShifts) {
        const response = await fetch(`/api/user/update/${userId}/${shiftId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to assign shift");
        }
      }

      // Reset the form after all shifts are assigned
      setFormData({
        userId: selectedEmp ? selectedEmp._id : "",
        selectedShifts: [],
      });

      // Close the modal if needed
      setOpened(false);

      console.log("Shifts assigned successfully");

      // Send additional PUT requests to update shift data
      for (const shiftId of selectedShifts) {
        await fetch(`/api/shift/update/${shiftId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      console.log("Shift data updated successfully");
    } catch (error) {
      console.error("Error assigning shifts:", error);
    }
  };

  return (
    <Dialog
      opened={opened}
      setOpened={setOpened}
      title="Add Employee"
      size="350px"
      isFormModal
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex flex-col text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold ">Employee Name :</span>{" "}
              {selectedEmp?.first_name} {selectedEmp?.last_name}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Date :</span>{" "}
              {dayjs(selectedEmpDate).format("MMM-DD - ddd")}
            </div>
          </div>
          <div className="font-semibold mt-4">Assign available shifts</div>
          <div className="flex flex-col">
            {availableShifts.map((data) =>
              !data.isAssigned ? (
                <label
                  key={data._id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedShifts.includes(data._id)}
                    onChange={() => handleCheckboxChange(data._id)}
                  />
                  <div>
                    {data.start_time} - {data.end_time}
                  </div>
                </label>
              ) : null
            )}
            {availableShifts.every((data) => data.isAssigned) && (
              <p key="no-shifts">No shifts left</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignShiftModal;
