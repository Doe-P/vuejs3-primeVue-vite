import {onMounted, reactive, ref, toRefs, watch, watchEffect} from 'vue'

export default function (Api = () => {
}, params = {}, options = {}) {
    const {pageNum = 1, pageSize = 10, watchFiled = true, needLoading = true, debounceTime = 600} = options
    const tableLoading = ref(false);
    const tableData = reactive({
        list: []
    });
    const tableError = reactive({
        err: null
    });
    const tableTimer = ref(null)
    const tablePagination = reactive({
        current: pageNum,
        pageSize: pageSize,
        total: 0,
        hideOnSinglePage: false,
        showSizeChanger: true,
        showQuickJumper: true,
        size: 'large',
        showTotal: (total, range) => ` ${total}  ${range[0]}~${range[1]}`
    })
    const tablePaginationChange = pagination => {
        tablePagination.current = pagination.current
        tablePagination.pageSize = pagination.pageSize
        const {current, pageSize} = tablePagination
        const data = {
            ...params,
            pageNum: current,
            pageSize
        }
        initTableData(data)
    };
    const queryTableData = () => {
        tablePagination.current = 1
        const {current, pageSize} = tablePagination
        const data = {
            ...params,
            pageNum: current,
            pageSize
        }
        initTableData(data)
    }

    function initTableData(data) {
        if (needLoading) {
            tableLoading.value = true
        }
        Api(data)
            .then((res) => {
                tableData.list = res.data;
                tablePagination.total = res.totalRecord;
                tableLoading.value = false
            })
            .catch(err => {
                tableError.err = err
                tableLoading.value = false
            })
    };

    onMounted(() => {
        queryTableData()
    })

    const Action = [tablePaginationChange]
    return {...toRefs(tableData), tablePagination, tableError, tableLoading, Action}
}
