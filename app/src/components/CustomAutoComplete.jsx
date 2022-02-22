import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import { TextField, Checkbox } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { VariableSizeList } from "react-window";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import train from '../assets/avion.png'

const CustomAutoComplete = ({ data, state, label }) => {
  
  const handleaeroport = React.useMemo((event, value) => {
      state.setValue(value);
  }, []);

  const renderItem = (elm) => {
      return (
          <Box sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
              <img
                  loading="lazy"
                  width="40"
                  src={train}
                  alt=""
              />
              {elm}
          </Box>
      );
  };

  // For long autocomplete with react-window
  const LISTBOX_PADDING = 8; // px

  function renderRow(props) {
      const { data, index, style } = props;
      return React.cloneElement(data[index], {
          style: {
          ...style,
          top: style.top + LISTBOX_PADDING
          }
      });
  }

  const OuterElementContext = React.createContext({});

  const OuterElementType = React.forwardRef((props, ref) => {
      const outerProps = React.useContext(OuterElementContext);
      return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data) {
      const ref = React.useRef(null);
      React.useEffect(() => {
          if (ref.current != null) {
          ref.current.resetAfterIndex(0, true);
          }
      }, [data]);
      return ref;
  }

  // Adapter for react-window
  const ListboxComponent = React.useCallback(
    React.forwardRef((props, ref) => {
      const { children, ...other } = props;
      const itemData = React.Children.toArray(children);
      const itemCount = itemData.length;
      const itemSize = 50;

      const getChildSize = child => {
        return itemSize;
      };

      const getHeight = () => {
        if (itemCount > 8) {
          return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
      };

      const gridRef = useResetCache(itemCount);

      return (
        <div ref={ref}>
          <OuterElementContext.Provider value={other}>
            <VariableSizeList
              itemData={itemData}
              height={getHeight() + 2 * LISTBOX_PADDING}
              width="100%"
              ref={gridRef}
              outerElementType={OuterElementType}
              innerElementType="ul"
              itemSize={index => getChildSize(itemData[index])}
              overscanCount={5}
              itemCount={itemCount}
            >
              {renderRow}
            </VariableSizeList>
          </OuterElementContext.Provider>
        </div>
      );
    }),
    []
  );

  const RenderLongAutocomplete = (onChange, value, options, label) => {
    const classes = makeStyles({
      listbox: {
        boxSizing: "border-box",
        "& ul": {
          padding: 0,
          margin: 0
        }
      }
    })();

    return (
      <Autocomplete
          style={{width: '90%', margin: 'auto', marginTop: 10, background: 'white'}}
        onChange={onchange}
        value={value ? value : ""}
        disableListWrap
        disableCloseOnSelect
        openOnFocus
        classes={classes}
        ListboxComponent={ListboxComponent}
        options={options}
        renderInput={params => (
          <TextField  onChange={(event) => state.setValue(event.target.value)} {...params} variant="outlined" label={label} />
        )}
        renderOption={(option) =>
          renderItem(option)
        }
      />
    );
  };
  
  return (
      <div>
        {RenderLongAutocomplete(
          handleaeroport,
          state.value,
          data.aeroport,
          label
        )}
      </div>  
  );
};

export default CustomAutoComplete;
