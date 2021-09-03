import React,{useState} from 'react';
import {withStyles,makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow ,
    TableSortLabel,
    Paper
} from '@material-ui/core';
import styles from './table.module.css';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#F0F0F0',
        color: '#555',
        fontWeight: 550,
        lineHeight: '1.5rem',
    },
    root: {
        fontFamily:`'Montserrat','roboto'`,
        padding: '1em 0.3em'
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function TableData (props){
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.startKey);
    function descendingComparator(a, b, orderBy) {
        if(typeof a[orderBy] ===('string' || 'number')){
            const tmp=b[orderBy].localeCompare(a[orderBy], undefined, {numeric: true, sensitivity: 'base'})
            if (tmp===-1) {
                return -1;
            }
            if (tmp===0 || tmp===1) {
                return 1;
            }
            return 0;
        }
        else {
            return 0;
        }
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const handleRequestSort = ( property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    return(
        <>
            <TableContainer component={Paper}>
                <Table aria-label="caption table" >
                    <TableHead>
                        <TableRow>
                            {props.cols.map((col,index)=>(
                                <StyledTableCell
                                    align="left"
                                    key={index}
                                    sortDirection={orderBy === col.key? order : false}
                                >
                                    {col.key!=="" ? (
                                        <span className={styles.wrapField}>
                                        <TableSortLabel
                                            active={orderBy === col.key}
                                            direction={orderBy === col.key ? order : 'asc'}
                                            onClick={()=>handleRequestSort(col.key)}
                                        >
                                            {col.lable}
                                            {orderBy === col.key ? (
                                                <span className={classes.visuallyHidden}>
                                                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                     </span>
                                    ):(
                                        <span className={styles.wrapField}>
                                            {col.lable}
                                        </span>
                                    )}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.length!==0 && stableSort(props.rows, getComparator(order, orderBy))
                            .map((row) => (
                            <TableRow key={row.id}>
                                {props.cols.map((field)=>(
                                    <StyledTableCell align="left" key={field.key}>
                                      <span className={styles.wrapField}>
                                        {field.lable==="Actions" ? (
                                            <>
                                              {props.onEdit && (
                                                  <span className={styles.icon} >
                                                    <i className="fa fa-pencil-square-o" onClick={()=>props.onEdit(row)}/>
                                                  </span>
                                              )}
                                               {props.onDelete && (
                                                    <span className={styles.icon} >
                                                      <i className="fa fa-trash" onClick={()=>props.onDelete(row)}/>
                                                    </span>
                                               )}
                                               {props.onDownload && (
                                                   <span className={styles.icon}>
                                                       <i className="fas fa-download" onClick={()=>props.onDownload(row)}/>
                                                   </span>
                                               )}
                                            </>
                                        ):(
                                            <>
                                            { (field.key === "color") ? (
                                                <div style={{backgroundColor: row[field.key]}} className={styles.color_box}></div>
                                            ) : (
                                                <span>{(field.isDate)   ? `${moment(row[field.key]).format(props.dateFormat)}`
                                                                        :`${row[field.key]}`}</span>
                                            )}
                                            </>
                                        )}
                                      </span>
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    {props.rows.length===0 && (
                        <caption>No data found.</caption>
                    )}
                </Table>
            </TableContainer>
        </>
    )
}

export default TableData;