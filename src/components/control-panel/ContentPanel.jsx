import SectionHeroCard from "./SectionHeroCard.jsx";

function ContentPanel({
  catalogs,
  currentSection,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onDeleteRecord,
  onSaveRecord,
  onUpdateCatalogItem,
  onUpdateRecord,
  records,
}) {
  return (
    <section className="content-panel">
      <section className="content-grid">
        <SectionHeroCard
          catalogs={catalogs}
          currentSection={currentSection}
          onCreateCatalogItem={onCreateCatalogItem}
          onDeleteCatalogItem={onDeleteCatalogItem}
          onDeleteRecord={onDeleteRecord}
          records={records}
          onSaveRecord={onSaveRecord}
          onUpdateCatalogItem={onUpdateCatalogItem}
          onUpdateRecord={onUpdateRecord}
        />
      </section>
    </section>
  );
}

export default ContentPanel;
