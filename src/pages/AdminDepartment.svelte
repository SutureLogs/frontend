<script>
  import toast from "svelte-french-toast";
  import LayoutWithAdminNav from "../components/LayoutWithAdminNav.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import axios from "axios";
  import { store } from "../stores/store";
  import { onMount } from "svelte";

  const BASEURL = import.meta.env.VITE_BASEURL;
  let isAddDepartmentModalOpen = false;
  let isEditDepartmentModalOpen = false;
  let newDepartmentName = "";
  let editDepartmentName = "";
  let editDepartmentID = "";
  let loading = false;

  let data = [
    {
      departmentName: "",
      departmentStrength: 0,
      departmentID: "",
    },
  ];
  async function addDepartment() {
    if (newDepartmentName === "")
      return toast.error("Please enter a department name");
    loading = true;
    const response = await axios.post(
      BASEURL + "/admin/add-department",
      {
        department: newDepartmentName,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );

    if (response.data.status === "success") {
      toast.success("Department added successfully");
      data = [
        ...data,
        {
          departmentName: newDepartmentName,
          departmentStrength: 0,
          departmentID: response.data.department._id,
        },
      ];
      isAddDepartmentModalOpen = false;
    } else {
      toast.error("Something went wrong");
    }
    loading = false;
  }

  function deleteDepartment() {}

  async function editDepartment() {
    if (editDepartmentName === "")
      return toast.error("Please enter a department name");
    loading = true;
    const response = await axios.post(
      BASEURL + "/admin/edit-department",
      {
        departmentId: editDepartmentID,
        departmentName: editDepartmentName,
      },
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    if (response.data.status === "success") {
      toast.success("Department edited successfully");
      isAddDepartmentModalOpen = false;
    } else {
      toast.error(response.data.message);
    }
    loading = false;
  }

  onMount(async () => {
    loading = true;
    const response = await axios.get(BASEURL + "/admin/get-departments", {
      headers: {
        token: $store.jwt,
      },
    });
    if (response.data.status === "success") {
      data = response.data.departments.map((dep) => {
        return {
          departmentName: dep.name,
          departmentStrength: dep.departmentStrength,
          departmentID: dep._id,
        };
      });
    } else {
      toast.error(response.data.message);
    }
    loading = false;
  });
</script>

<input
  type="checkbox"
  checked={isEditDepartmentModalOpen}
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box relative">
    <button
      on:click={() => (isEditDepartmentModalOpen = false)}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >
    <h3 class="text-lg font-bold">Edit department - {editDepartmentName}</h3>
    <div class="py-4 flex flex-col">
      <input
        type="text"
        bind:value={editDepartmentName}
        placeholder="Modified Department Name"
        class="input input-bordered"
      />

      <button on:click={editDepartment} class="btn bg-primary border-0 mt-4"
        >Make Changes</button
      >
    </div>
  </div>
</div>

<input
  type="checkbox"
  checked={isAddDepartmentModalOpen}
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box relative">
    <button
      on:click={() => (isAddDepartmentModalOpen = false)}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >
    <h3 class="text-lg font-bold">Add a department</h3>
    <div class="py-4 flex flex-col">
      <input
        type="text"
        bind:value={newDepartmentName}
        placeholder="New Department Name"
        class="input input-bordered"
      />

      <button on:click={addDepartment} class="btn bg-primary border-0 mt-4"
        >Add Department</button
      >
    </div>
  </div>
</div>

<LayoutWithAdminNav>
  <div class="p-10 pb-4">
    <div class="flex justify-between items-center">
      <Heading2 styleClass="text-lg py-0 flex gap-3 items-center">
        Departments</Heading2
      >
      <button
        on:click={() => (isAddDepartmentModalOpen = true)}
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
            <th>Department Name</th>
            <!-- <th>Department Strength</th> -->
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if loading}
            <tr>
              <td colspan="4" class="text-center animate-pulse">Loading...</td>
            </tr>
          {:else if data.length === 0}
            <tr>
              <td colspan="4" class="text-center">No departments found</td>
            </tr>
          {:else}
            {#each data as department, index}
              <tr>
                <th>{index + 1}</th>
                <td>{department.departmentName}</td>
                <!-- <td>0</td> -->
                <td class="flex items-center gap-2">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    on:click={() => {
                      editDepartmentID = department.departmentID;
                      editDepartmentName = department.departmentName;
                      isEditDepartmentModalOpen = true;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div on:click={deleteDepartment}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 cursor-pointer"
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
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</LayoutWithAdminNav>
