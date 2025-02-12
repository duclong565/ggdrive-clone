import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { folders, files } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col items-center">
      Seed Function
      <form
        action={async () => {
          "use server";

          console.log("Seeding...");

          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index === 0 ? null : 1,
            })),
          );

          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 6900,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );

          console.log(folderInsert);
          console.log(fileInsert);

        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
