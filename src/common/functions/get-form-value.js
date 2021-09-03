import { DateRange } from "react-date-range";

export const handleSubmit = (id, fields, callBack) => {
  const form = document.getElementById(id);
  // const values = [...form.elements].filter((d) => d.className === 'form-control').map(({value}) => value || '');
  let values=[];
  [...form.elements].map((d)=>{
    if(d.placeholder==="Early"){
      values.push(d.value);
    }
    else if(d.placeholder==="Continuous"){
      values[1]+=`- ${d.value}`;
    }
    else if(d.type==="checkbox"){
      values.push(d.checked);
    }else if(d.className==="form-control"){
      values.push(d.value);
    }
  })
  if (fields) {
  const data = fields.filter(h => h.field).reduce((t, c, i ) => t = {...t, [c.field] : values[i]}, {});
    callBack(data);
  } else {
    callBack({})
  }
}