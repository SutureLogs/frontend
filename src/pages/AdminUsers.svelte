<script>
  // @ts-nocheck

  import toast from "svelte-french-toast";
  import LayoutWithAdminNav from "../components/LayoutWithAdminNav.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import axios from "axios";
  import { store } from "../stores/store";
  import { onMount } from "svelte";

  const BASEURL = import.meta.env.VITE_BASEURL;
  let isAddUserModalOpen = false;
  let newUsername = "";
  let newDepartmentID = "";
  let newName = "";
  let newPassword = "";
  let newQualification = "";

  let data = {
    availableDepartments: [{ departmentID: "", departmentName: "" }],
    users: [
      {
        name: "name",
        username: "username",
        department: "department",
        qualification: "qualification",
        doctorID: "doctorID",
      },
    ],
  };
  async function addUser() {
    if (newUsername === "") return toast.error("Please enter a username");
    if (newDepartmentID === "")
      return toast.error("Please select a department");
    if (newName === "") return toast.error("Please enter a name");
    if (newPassword === "") return toast.error("Please enter a password");
    if (newQualification === "")
      return toast.error("Please enter a qualification");

    const response = await axios.post(
      BASEURL + "/admin/add-doctor",
      {
        name: newName,
        password: newPassword,
        username: newUsername,
        departmentId: newDepartmentID,
        qualification: newQualification,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    if (response.data.status === "success") {
      toast.success("User added successfully");
      data.users = [
        ...data.users,
        {
          name: newName,
          username: newUsername,
          department: newDepartmentID,
          qualification: newQualification,
          doctorID: response.data.doctor._id,
        },
      ];
      isAddUserModalOpen = false;
    } else {
      toast.error(response.data.message);
    }
  }
  async function deleteUser(id) {
    const response = await axios.post(
      BASEURL + "/admin/delete-doctor",
      {
        doctorId: id,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    if (response.data.status === "success") {
      toast.success("User deleted successfully");
      data.users = data.users.filter((user) => {
        return user.doctorID !== id;
      });
    } else {
      toast.error(response.data.message);
    }
  }

  onMount(async () => {
    const response = await axios.get(BASEURL + "/admin/get-doctors", {
      headers: {
        token: $store.jwt,
      },
    });
    if (response.data.status === "success") {
      data.users = response.data.doctors.map((doc) => {
        return {
          name: doc.name,
          username: doc.username,
          department: doc.department,
          qualification: doc.qualification,
          doctorID: doc._id,
        };
      });
    } else {
      toast.error(response.data.message);
    }

    const responseDepartments = await axios.get(
      BASEURL + "/admin/get-departments",
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    if (responseDepartments.data.status === "success") {
      data.availableDepartments = responseDepartments.data.departments.map(
        (dept) => {
          return {
            departmentID: dept._id,
            departmentName: dept.name,
          };
        }
      );
    } else {
      toast.error(responseDepartments.data.message);
    }
  });
</script>

<input type="checkbox" checked={isAddUserModalOpen} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <button
      on:click={() => (isAddUserModalOpen = false)}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >
    <h3 class="text-lg font-bold">Add a new user</h3>
    <div class="py-4 flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label-text-alt">Name</label>
        <input
          type="text"
          bind:value={newName}
          placeholder="Name"
          class="input input-bordered"
        />
      </div>
      <div class="flex flex-col gap-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label-text-alt">Username</label>
        <input
          type="text"
          bind:value={newUsername}
          placeholder="Username"
          class="input input-bordered"
        />
      </div>
      <div class="flex flex-col gap-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label-text-alt">Username</label>
        <input
          bind:value={newPassword}
          placeholder="Password"
          type="password"
          class="input input-bordered"
        />
      </div>
      <div class="flex flex-col gap-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label-text-alt">Qualification</label>
        <input
          type="text"
          bind:value={newQualification}
          placeholder="Qualification"
          class="input input-bordered"
        />
      </div>

      <div class="flex flex-col gap-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label-text-alt">Choose Department</label>
        <select
          bind:value={newDepartmentID}
          class="select select-bordered w-full"
        >
          {#each data.availableDepartments as { departmentName, departmentID }}
            <option value={departmentID}>{departmentName}</option>
          {/each}
        </select>
      </div>

      <button on:click={addUser} class="btn bg-primary border-0 mt-4"
        >Add Department</button
      >
    </div>
  </div>
</div>
<LayoutWithAdminNav>
  <div class="p-10 pb-4">
    <div class="flex justify-between items-center">
      <Heading2 styleClass="text-lg py-0 flex gap-3 items-center">
        Users</Heading2
      >
      <button
        on:click={() => (isAddUserModalOpen = true)}
        class="btn btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>

    <div class="overflow-x-auto mt-5">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th />
            <th>Username</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each data.users as { name, username, doctorID }, i}
            <tr>
              <th>{i + 1}</th>
              <td>{name}</td>
              <td>{username}</td>
              <td class="flex items-center">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div on:click={() => deleteUser(doctorID)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</LayoutWithAdminNav>
