import SectionHeroCard from "./SectionHeroCard.jsx";

function ContentPanel({
  catalogs,
  currentSection,
  isLoadingRecords,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onDeleteRecord,
  onSaveRecord,
  onUpdateCatalogItem,
  onUpdateRecord,
  recordsError,
  records,
}) {
  return (
    <section className="content-panel">
      <section className="content-grid">
        <SectionHeroCard
          catalogs={catalogs}
          currentSection={currentSection}
          isLoadingRecords={isLoadingRecords}
          onCreateCatalogItem={onCreateCatalogItem}
          onDeleteCatalogItem={onDeleteCatalogItem}
          onDeleteRecord={onDeleteRecord}
          records={records}
          recordsError={recordsError}
          onSaveRecord={onSaveRecord}
          onUpdateCatalogItem={onUpdateCatalogItem}
          onUpdateRecord={onUpdateRecord}
        />
      </section>
    </section>
  );
}

export default ContentPanel;
