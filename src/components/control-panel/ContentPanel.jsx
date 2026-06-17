import SectionHeroCard from "./SectionHeroCard.jsx";

function ContentPanel({
  catalogs,
  currentSection,
  isLoadingRecords,
  isSavingRecord,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onDeleteRecord,
  onSaveRecord,
  onUpdateCatalogItem,
  onUpdateRecord,
  recordsError,
  records,
  saveRecordError,
}) {
  return (
    <section className="content-panel">
      <section className="content-grid">
        <SectionHeroCard
          catalogs={catalogs}
          currentSection={currentSection}
          isLoadingRecords={isLoadingRecords}
          isSavingRecord={isSavingRecord}
          onCreateCatalogItem={onCreateCatalogItem}
          onDeleteCatalogItem={onDeleteCatalogItem}
          onDeleteRecord={onDeleteRecord}
          records={records}
          recordsError={recordsError}
          saveRecordError={saveRecordError}
          onSaveRecord={onSaveRecord}
          onUpdateCatalogItem={onUpdateCatalogItem}
          onUpdateRecord={onUpdateRecord}
        />
      </section>
    </section>
  );
}

export default ContentPanel;
