<script>
  import LayoutWithNav from "../components/LayoutWithNav.svelte";
  import PortfolioCard from "../components/design/cards/PortfolioCard.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import Paragraph from "../components/design/titles/Paragraph.svelte";
</script>

<LayoutWithNav>
  <div class="p-10 h-full">
    <Heading2>Profile</Heading2>
    <div class="flex flex-col h-full items-center mt-10">
      <div class="max-w-4xl">
        <div class="flex items-center justify-between gap-3 border-b-2 pb-7">
          <div class="flex flex-col">
            <Heading2>Yajat Vinod Vishwakarma</Heading2>
            <Paragraph>Doctor</Paragraph>
            <Paragraph>@ Organization</Paragraph>
          </div>
          <img
            src="https://via.placeholder.com/300"
            class="rounded-full object-cover w-24 h-24"
            alt=""
          />
        </div>
        <Label styleClass="mt-10 text-primary">Surgeries on SutureLogs</Label>
        <div class="grid grid-cols-2 gap-10 mt-4">
          <PortfolioCard
            editable={false}
            surgeryName={"Surgery Name"}
            img={"https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg"}
            logID={"123"}
          />
          <PortfolioCard
            editable={false}
            surgeryName={"Surgery Name"}
            img={"https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/1968EA5E-28A1-49D1-A27CC556F7B8DF3C/C3E67292-300A-4B3F-AF06F349CDFBB918/WebsiteJpg_XL-FSURG_Main%20Visual_Cyan_Website.jpg"}
            logID={"123"}
          />
        </div>
      </div>
    </div>
  </div>
</LayoutWithNav>
