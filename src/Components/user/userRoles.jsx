class UserRoles extends Component {
  state = {
    data: {
      data: {
        user_id: this.props.match.params.id,
        role_id: '',
      },
      userRoles: [],
      users: [],
      roles: [],
      errors: {},
      isLoading: false,
    }
  }

  schema = Joi.object({
    user_id: Joi.string().label("Miembro").min(36).max(36).messages(messages),
    role_id: Joi.string().label("Rol").min(36).max(36).messages(messages),
  });

  getUserRoles(userId, roleId) {
    return this.state.userRoles.find((userRole) => userRole.user.id === roleId && userRole.model_id === userId);
  }

  render() {
    return (  );
  }
}

export default UserRoles;