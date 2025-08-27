<script setup>

import {computed, onMounted} from "vue";
import {router, usePage} from "@inertiajs/vue3";

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    actions: Array,
    filters: {
        type: Object,
        default: () => {}
    },
    rowKey: {
        default: 'id'
    },
    reload_route: String,
    showIndex: {
        type: Boolean,
        default: false
    },
    btn_action: {
        type: Boolean,
        default: true
    }
})

const page = usePage();

const pagination = computed(() => {
    return {
        total: props.data.total,
        current: props.data.current_page,
        pageSize: props.data.per_page,
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]} - ${range[1]} sur ${total}`
    }
})

const handleTableChange = (pag, filters, sorter) => {
    router.get(page.url.split('?')[0],
        {page: pag.current, ...props.filters},
        {
            preserveState: true,
            preserveScroll: true
        }
    );
};

const handleActionVisible = (action, record) => {

    if (action.visible === null || action.visible === undefined) return true;

    if (typeof action.visible === 'boolean') return action.visible;

    if (typeof action.visible === 'function') return action.visible(record);

    return false;
};

const handleActionDisabled = (action, record) => {
    if (action.disabled === null || action.disabled === undefined) return false;

    if (typeof action.disabled === 'boolean') return action.disabled;

    if (typeof action.disabled === 'function') return action.disabled(record);

    return true;
};


onMounted(() => {
    if(props.showIndex && !props.columns.find(c => c.key === 'index'))
        props.columns.unshift({title: '#', key: 'index', width: 20});

    if(props.actions && !props.columns.find(c => c.key === 'action'))
        props.columns.push({title: '', key: 'action', width: 50,customCell: () => {
                return {
                    class: 'fixed-column'
                }
            }})
})

</script>

<template>
    <a-table
        class="main-table whitespace-nowrap main-rounded overflow-hidden h-[calc(100vh-150px)] overflow-y-auto "
        :data-source="data.data"
        :pagination="pagination"
        @change="handleTableChange"
        :columns="columns"
        :row-key="rowKey"
        :scroll="{ x: 'auto' }"
        size="small"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    >

        <template #headerCell="{ column }">
            <slot name="headerCell" :column="column">
                <span class="uppercase text-nowrap">{{ column.title }}</span>
            </slot>
        </template>

        <template #emptyText>
            <a-empty description="Aucun resultats" class="my-10" />
        </template>

        <template #bodyCell="{ column, record, text, index }">
            <slot :column="column" :record="record" :text="text" :index="index"></slot>
            <template v-if="column.key ==='image'">

                <a-image
                    :width="60"
                    :src="record.thumb_image ?? record.thumb_img"
                    :preview="{
                            src: record.background_image ?? record.img
                        }"
                    fallback=""
                    class="rounded object-cover h-[40px]"
                />
            </template>

            <template v-if="column.key ==='img_2'">

                <a-image
                    :width="60"
                    :src="record.thumb_img2 ?? record.thumb_img2"
                    :preview="{
                            src: record.img_2
                        }"
                    fallback=""
                    class="rounded object-cover h-[40px]"
                />
            </template>

            <template v-if="column.key === 'action'">
                <a-dropdown placement="bottomRight" :trigger="['click']" v-if="btn_action">
                    <a-button type="text" class="!p-0 !h-0 hover:!bg-transparent hover:text-text-primary hover:shadow-none !text-lg">
                        <font-awesome-icon icon="fa-solid fa-ellipsis" />
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <span v-for="action in actions">
                                <hr v-if="action.text === '-'"/>
                                <a-menu-item
                                    v-else
                                    :key="action.text"
                                    :class="action.class"
                                    :disabled="handleActionDisabled(action, record)"
                                    @click="action.action(record)"
                                    v-if="handleActionVisible(action, record)"
                                >
                                    <font-awesome-icon v-if="action.icon" class="me-2" :icon="action.icon" />
                                    <span>{{ action.text }}</span>
                                </a-menu-item>
                            </span>
                        </a-menu>
                    </template>
                </a-dropdown>
                <template v-else v-for="action in actions" :key="action.text">
                    <a-button :class="action.class" :disabled="handleActionDisabled(action, record)" @click="action.action(record)" type="text" class="!p-0 !h-0 hover:!bg-transparent hover:text-text-primary hover:shadow-none !text-lg">
                        <font-awesome-icon :icon="action.icon" />
                    </a-button>
                </template>


            </template>

        </template>

        <template #summary>
            <slot name="summary" />
        </template>

        <template v-if="$slots.expandedRowRender" #expandedRowRender="{ record }">
            <slot name="expandedRowRender" :record="record" />
        </template>
    </a-table>
</template>

