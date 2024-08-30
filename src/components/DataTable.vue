<template>
    <div>
        <!-- Existing select and search elements -->
        <div class="d-flex justify-content-between mt-2">
            <div>
                <select name="" id="" class="form-select" v-model="perPageLength">
                    <option v-for="option in pageSizeArr" v-bind:value="option">
                        {{ option }}
                    </option>
                </select>
            </div>
            <div class="d-flex">
                <div>
                    <input v-model="searchQuery" placeholder="Search..." class="form-control" />
                </div>
            </div>
        </div>

        <!-- Existing table -->
        <table class="table">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key" @click="sortBy(column.key)">
                        {{ column.label }}
                        <span v-if="sortColumn === column.key">
                            {{ sortDirection === 'asc' ? '▲' : '▼' }}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedData.length > 0" v-for="item in paginatedData" :key="item.id">
                    <td v-for="column in columns" :key="column.key">
                        <div v-if="column.ediAction" v-html="column.ediAction(item)" @click="column.ediAction(item)"></div>
                        <div v-else>{{ item[column.key] }}</div>
                    </td>
                </tr>
                <tr v-else-if="isLoading">
                    <td :colspan="columns.length" class="text-center">Loading...</td>
                </tr>
                <tr v-else-if="paginatedData.length < 1">
                    <td :colspan="columns.length" class="text-center">No record.</td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination with Page Numbers -->
        <div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button @click="prevPage" class="page-link">Previous</button>
                    </li>

                    <li class="page-item" v-for="page in pagesToShow" :key="page"
                        :class="{ active: page === currentPage }">
                        <button @click="goToPage(page)" class="page-link">{{ page }}</button>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button @click="nextPage" class="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import BatchInterface from '../Interfaces/BatchInterface';

interface Column {
    key: string;
    label: string;
    ediAction?: (id: number) => string;
}
let isLoading = true;
const perPageLength = ref(10);
export default defineComponent({
    props: {
        data: {
            type: Array as () => BatchInterface[],
            required: true
        },
        columns: {
            type: Array as () => Column[],
            required: true
        }
    },
    setup(props) {
        const searchQuery = ref('');
        const sortColumn = ref<string | null>(null);
        const sortDirection = ref<'asc' | 'desc'>('asc');
        const currentPage = ref(1);
        const pageSize = ref(10);
        const pageSizeArr = [10, 20, 50, 100];

        const filteredData = computed(() => {
            return props.data.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
                )
            );
        });

        const sortedData = computed(() => {
            if (!sortColumn.value) return filteredData.value;
            return filteredData.value.slice().sort((a: any, b: any) => {
                const aValue = a[sortColumn.value!];
                const bValue = b[sortColumn.value!];
                if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
                return 0;
            });
        });

        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * pageSize.value;
            const end = start + pageSize.value;
            return sortedData.value.slice(start, end);
        });

        const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value));

        const sortBy = (key: string) => {
            if (sortColumn.value === key) {
                sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn.value = key;
                sortDirection.value = 'asc';
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const goToPage = (page: number) => {
            currentPage.value = page;
        };

        // Generate the array of pages to display
        const pagesToShow = computed(() => {
            const pages = [];
            const maxPagesToShow = 5;

            if (totalPages.value <= maxPagesToShow) {
                for (let i = 1; i <= totalPages.value; i++) {
                    pages.push(i);
                }
            } else {
                if (currentPage.value <= 3) {
                    pages.push(1, 2, 3, '...', totalPages.value);
                } else if (currentPage.value >= totalPages.value - 2) {
                    pages.push(1, '...', totalPages.value - 2, totalPages.value - 1, totalPages.value);
                } else {
                    pages.push(1, '...', currentPage.value, '...', totalPages.value);
                }
            }

            return pages;
        });

        return {
            searchQuery,
            sortColumn,
            sortDirection,
            currentPage,
            pageSize,
            paginatedData,
            totalPages,
            sortBy,
            nextPage,
            prevPage,
            goToPage,
            pagesToShow,
            pageSizeArr
        };
    },
    data() {
        return {
            isLoading,
            perPageLength

        };
    }
});
</script>
