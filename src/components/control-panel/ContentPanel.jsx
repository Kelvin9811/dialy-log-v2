import SectionHeroCard from "./SectionHeroCard.jsx";

function ContentPanel({
  catalogs,
  catalogsError,
  catalogOperationError,
  currentSection,
  deleteRecordError,
  isDeletingRecord,
  isLoadingCatalogs,
  isLoadingRecords,
  isSavingCatalogItem,
  isSavingRecord,
  isUpdatingRecord,
  onCreateCatalogItem,
  onDeleteCatalogItem,
  onDeleteRecord,
  onSaveRecord,
  onUpdateCatalogItem,
  onUpdateRecord,
  recordsError,
  records,
  saveRecordError,
  updateRecordError,
}) {
  return (
    <section className="content-panel">
      <section className="content-grid">
        <SectionHeroCard
          catalogs={catalogs}
          catalogsError={catalogsError}
          catalogOperationError={catalogOperationError}
          currentSection={currentSection}
          deleteRecordError={deleteRecordError}
          isDeletingRecord={isDeletingRecord}
          isLoadingCatalogs={isLoadingCatalogs}
          isLoadingRecords={isLoadingRecords}
          isSavingCatalogItem={isSavingCatalogItem}
          isSavingRecord={isSavingRecord}
          isUpdatingRecord={isUpdatingRecord}
          onCreateCatalogItem={onCreateCatalogItem}
          onDeleteCatalogItem={onDeleteCatalogItem}
          onDeleteRecord={onDeleteRecord}
          records={records}
          recordsError={recordsError}
          saveRecordError={saveRecordError}
          updateRecordError={updateRecordError}
          onSaveRecord={onSaveRecord}
          onUpdateCatalogItem={onUpdateCatalogItem}
          onUpdateRecord={onUpdateRecord}
        />
      </section>
    </section>
  );
}

export default ContentPanel;
