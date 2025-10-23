<style scoped>
/* ===== STYLES POUR LES MODALS ===== */
/* Full-screen Modal */
.full-modal :deep(.ant-modal) {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
    height: 100vh;
}

.full-modal :deep(.ant-modal-content) {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.full-modal :deep(.ant-modal-body) {
    flex: 1;
    overflow: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.full-modal :deep(.ant-modal-footer) {
    position: sticky;
    bottom: 0;
    background: #f5f5f5 !important;
    z-index: 1;
    padding: 16px 24px;
    border-top: 1px solid #e5e7eb !important;
    margin: 0 -24px -16px -24px;
}

/* Primary header Modal */
.primary-modal :deep(.ant-modal-header) {
    margin: -24px -24px 0 -24px;
    padding: 16px 24px;
    background: #f5f5f5 !important;
    border-bottom: none;
    border-top-left-radius: var(--ant-border-radius-lg);
    border-top-right-radius: var(--ant-border-radius-lg);
}

.primary-modal :deep(.ant-modal-header .ant-modal-title) {
    color: #000000 !important;
    margin: 0;
}

.primary-modal :deep(.ant-modal-close) {
    color: #000000 !important;
}

.primary-modal :deep(.ant-modal-close:hover) {
    color: color-mix(in srgb, var(--ant-color-text-light-solid) 85%, transparent) !important;
}
</style>
