package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

@Entity
@Table(name="users", indexes = {
	       @Index(columnList = "id_user", name = "user_hndx"),
	       @Index(columnList = "loginname,password", name = "user_login_hndx")
}) 
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_user")
	private int idUser;
	
	@Column(length=250)
	private String fullName;

	@Column(length=100)
	private String userMail;
	
	@Column(length=50)
	private String loginName;
	
	@Column(length=40)
	private String password;

    @OneToMany(orphanRemoval=true,  mappedBy="user", fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Scenery> sceneries;	
	
    public User() {
    	sceneries = new HashSet<Scenery>();
	}
    
    public void deactivateScenery( Scenery scenery) {
    	for( Scenery scn : sceneries ) {
    		if( scn.getIdScenery() == scenery.getIdScenery() ) {
    			scn.setActive( false );
    		}
    	}
    }
    
    public Scenery getActiveScenery() {
    	for ( Scenery scn : sceneries ) {
    		if ( scn.isActive() ) return scn;
    	}
    	return null;
    }

    public void removeScenery( Scenery scn ) {
    	sceneries.remove( scn );
    }
    
    public void addScenery( Scenery scn ) {
    	scn.setUser( this );
    	sceneries.add( scn );
    }
    
	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getUserMail() {
		return userMail;
	}

	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Scenery> getSceneries() {
		return sceneries;
	}
	
}
