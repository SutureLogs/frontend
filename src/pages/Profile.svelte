<script>
  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import PortfolioCard from "../components/design/cards/PortfolioCard.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import Paragraph from "../components/design/titles/Paragraph.svelte";
  let BASEURL = import.meta.env.VITE_BASEURL;
  let data = {
    doctorFullName: "John Doe",
    doctorQualification: "MBBS, MD",
    doctorOrganisation: "Organisation Name",
    doctorImg: "https://via.placeholder.com/123",
    surgeries: [
      {
        surgeryName: "surgeryName",
        img: "img",
        logID: "logID",
      },
    ],
  };
</script>

<LayoutWithNav>
  <div class="p-10 h-full">
    <Heading2>Profile</Heading2>
    <div class="flex flex-col h-full items-center mt-10">
      <div class="max-w-4xl">
        <div class="flex items-center justify-between gap-3 border-b-2 pb-7">
          <div class="flex flex-col">
            <Heading2>{data.doctorFullName}</Heading2>
            <Paragraph>{data.doctorQualification}</Paragraph>
            <Paragraph>@ {data.doctorOrganisation}</Paragraph>
          </div>
          <img
            src={BASEURL + "/surgery/img" + data.doctorOrganisation}
            class="rounded-full object-cover w-24 h-24"
            alt=""
          />
        </div>
        <Label styleClass="mt-10 text-primary">Surgeries on SutureLogs</Label>
        <div class="grid grid-cols-2 gap-10 mt-4">
          {#each data.surgeries as surgery}
            <PortfolioCard
              editable={false}
              surgeryName={surgery.surgeryName}
              img={surgery.img}
              logID={surgery.logID}
            />
          {/each}
        </div>
      </div>
    </div>
  </div>
</LayoutWithNav>
