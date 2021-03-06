import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
//import { getMenu } from './menudata'
//https://v0.material-ui.com/#/components/list

class NestedList extends React.Component {
  state = {
 //   menuSelectedIndex: this.props.menuSelectedIndex,
    menuSelectedIndex: 0,
 //   grid: false
  };

  handleClick = (name, key, type, reactname, componentname, text) => {
    console.log(key)
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    //console.log(key)
    //console.log(type)
    this.props.onMenuClick(name, type, reactname, componentname, text)
  };

  handleRootClick = (name, key, type, reactname, componentname, text) => {
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    //console.log(key)
    //console.log(type)
    //this.props.onMenuClick(name, type, reactname, 'reactname', text)
  };

  // handleMidClick = (name, key, type, reactname, text) => {
  //   this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
  //console.log(key)
  //   //this.props.onMenuClick(name, type, reactname, 'mid', text)
  // };

  handleExampleClick = (name, key, type, reactname, componentname, text) => {
    this.setState({ [name]: !this.state[name], menuSelectedIndex: key });
    //console.log(key)
    //console.log(type)
    //this.props.onMenuClick(name, type, reactname, componentname)
  };

  render() {
    const menu = this.props.menu;
    const { menuSelectedIndex } = this.state;
    const { rootopen } = this.props;
    //console.log(this.props)

    //console.log(menuopen)
    //var menuSelectedIndex = menuopen
    //console.log(menuSelectedIndex)
    return (

      <div>
        <List>
          {menu.map((rootitem, index1) => {
            return (

              <div key={rootitem.id}>
                <ListItem button selected={menuSelectedIndex === (100*rootitem.id)} key={(100*rootitem.id)} onClick={this.handleClick.bind(this, rootitem.name, (100*rootitem.id), rootitem.type, rootitem.name, rootitem.componentname, rootitem.text)}>
                  <ListItemText primary={<Typography style={{color: '#ffffff',fontSize:'18px' }}>{rootitem.text}</Typography>} />
                  {rootitem.count !== 0 &&
                  <ListItemAvatar>
                    <Avatar style={{height:'30px',width:'30px',color:'black',background:'white'}}>{rootitem.count}</Avatar>
                  </ListItemAvatar>
                  }
                  {this.state[rootitem.text] || rootopen ? (<ExpandLess style={{fontWeight:'bold',color:'white'}}/>) : (<ExpandMore style={{fontWeight:'bold',color:'white'}}/>)}
                </ListItem>
                <Collapse key={rootitem.children.id} component="li" in={this.state[rootitem.text] || rootopen} timeout="auto" unmountOnExit>
                <List>
                {rootitem.children.map((miditem, index2) =>
                  {
                    return (
                      <div key={miditem.id}>
                        <ListItem button selected={menuSelectedIndex === (100*rootitem.id)+(10*miditem.id)} key={(100*rootitem.id)+(10*miditem.id)} onClick={this.handleClick.bind(this,miditem.name, (100*rootitem.id)+(10*miditem.id), miditem.type, miditem.name, miditem.componentname, miditem.text)}>
                          <ListItemText primary={<Typography className="mid" >{miditem.text}</Typography>}/>
                          {miditem.children ? (this.state[miditem.text] ? (<ExpandLess style={{fontWeight:'bold',color:'white'}}/>) : (<ExpandMore style={{fontWeight:'bold',color:'white'}}/>)):(<div></div>)}
                        </ListItem>
                        {miditem.children ? (
                          <Collapse key={miditem.children.id} component="li" in={this.state[miditem.text]} timeout="auto" unmountOnExit>
                          <List>
                          {miditem.children.map((subitem, index3) => {
                            return (
                              <ListItem button selected={menuSelectedIndex === (100*rootitem.id)+(10*miditem.id+(1*subitem.id))} key={(100*rootitem.id)+(10*miditem.id)+(1*subitem.id)} onClick={this.handleClick.bind(this, subitem.name, (100*rootitem.id)+(10*miditem.id)+(1*subitem.id), subitem.type, subitem.name, subitem.componentname, subitem.text)}>
                                <ListItemText primary={<Typography className="example" >{subitem.text}</Typography>} />
                              </ListItem>
                            )
                          })}
                          </List>
                          </Collapse>
                          ): (<div></div>)
                        }
                      </div>
                    )
                  }
                )}
                </List>
                </Collapse>
                <Divider style={{background:'gray'}}/>
              </div>
            )
          })}
        </List>
      </div>
    );
  }

}
// NestedList.propTypes = {
//     classes: PropTypes.object.isRequired
// };
export default NestedList;
