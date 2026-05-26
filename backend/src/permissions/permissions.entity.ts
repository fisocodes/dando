import { MongoQuery } from "@casl/ability";
import { Column, Entity } from "typeorm";
import { CaslAction } from "../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import { BaseEntity } from "../common/entities/base.entity";

@Entity("permissions")
export class Permission extends BaseEntity {
	@Column()
	action!: CaslAction;

	@Column()
	subject!: CaslSubject;

	@Column({ default: false })
	inverted!: boolean;

	@Column({ type: "simple-json", nullable: true })
	conditions?: MongoQuery<unknown>;
}
